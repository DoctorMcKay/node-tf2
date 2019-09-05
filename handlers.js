const ByteBuffer = require('bytebuffer');
const Request = require('request');
const SteamID = require('steamid');
const VDF = require('vdf');

const TeamFortress2 = require('./index.js');
const Language = require('./language.js');
const Schema = require('./protobufs/generated/_load.js');

const handlers = TeamFortress2.prototype._handlers;

// ClientWelcome, ServerWelcome, ClientGoodbye, and ServerGoodbye
handlers[Language.ClientWelcome] = function(body) {
	let proto = decodeProto(Schema.CMsgClientWelcome, body);
	this.haveGCSession = true;
	this.emit('connectedToGC', proto.version);
};

handlers[Language.ServerWelcome] = function(body) {
	let proto = decodeProto(Schema.CMsgServerWelcome, body);
	this.haveGCSession = true;
	this.emit('connectedToGC', proto.active_version);
};

handlers[Language.ClientGoodbye] = function(body) {
	let proto = decodeProto(Schema.CMsgClientGoodbye, body);

	if (this.haveGCSession) {
		this._connect(); // Try to reconnect
		this.haveGCSession = false;
	}

	this.emit('disconnectedFromGC', proto.reason);
};

handlers[Language.ServerGoodbye] = function(body) {
	let proto = decodeProto(Schema.CMsgServerGoodbye, body);

	if (this.haveGCSession) {
		this._connect(); // Try to reconnect
		this.haveGCSession = false;
	}

	this.emit('disconnectedFromGC', proto.reason);
};

// Item schema
handlers[Language.UpdateItemSchema] = function(body) {
	let proto = decodeProto(Schema.CMsgUpdateItemSchema, body);
	this.emit('itemSchema', proto.item_schema_version.toString(16).toUpperCase(), proto.items_game_url);

	Request.get({
		"uri": proto.items_game_url,
		"gzip": true
	}, (err, response, body) => {
		if (err) {
			this.emit('debug', "Unable to download items_game.txt: " + err);
			this.emit('itemSchemaError', err);
			return;
		}

		this.itemSchema = VDF.parse(body).items_game;
		this.emit('itemSchemaLoaded');
	});
};

// Various notifications (why do we need three distinct interfaces??)
handlers[Language.SystemMessage] = function(body) {
	let proto = decodeProto(Schema.CMsgSystemBroadcast, body);
	this.emit('systemMessage', proto.message);
};

handlers[Language.ClientDisplayNotification] = function(body) {
	if (!this.lang) {
		// We only handle this if we have a localization file
		return;
	}

	let proto = decodeProto(Schema.CMsgGCClientDisplayNotification, body);
	let title = this.lang[proto.notification_title_localization_key.substring(1)];
	let text = (this.lang[proto.notification_body_localization_key.substring(1)] || '').replace(new RegExp('[\u0001|\u0002]', 'g'), '');
	text = text.replace(/\\"/g, '"'); // The vdf parser appears to not properly parse escaped quotes

	let replacement;
	for (let i = 0; i < proto.body_substring_keys.length; i++) {
		replacement = proto.body_substring_values[i];
		if (replacement.charAt(0) == '#') {
			replacement = this.lang[replacement.substring(1)];
		}

		text = text.replace('%' + proto.body_substring_keys[i] + '%', replacement);
	}

	this.emit('displayNotification', title, text);
};

handlers[Language.TFSpecificItemBroadcast] = function(body) {
	let proto = decodeProto(Schema.CMsgGCTFSpecificItemBroadcast, body);
	let defindex = proto.item_def_index;

	let message = null;

	if (this.lang && this.itemSchema) {
		let item = this.itemSchema.items[defindex] || {};
		let itemNameKey = item.item_name || '';
		let itemName = this.lang[itemNameKey.substring(1)];

		let localizationKey = proto.was_destruction ? "TF_Event_Item_Deleted" : "TF_Event_Item_Created";
		message = this.lang[localizationKey].replace('%owner%', proto.user_name).replace('%item_name%', itemName);
	}

	this.emit('itemBroadcast', message, proto.user_name, proto.was_destruction, defindex);
};

// Trading
handlers[Language.Trading_InitiateTradeRequest] = function(body) {
	let tradeID = body.readUint32();
	let steamID = new SteamID(body.readUint64().toString());
	this.emit('tradeRequest', steamID, tradeID);
};

handlers[Language.Trading_InitiateTradeResponse] = function(body) {
	let response = body.readUint32();
	let tradeID = body.readUint32();
	this.emit('debug', "Got trade response " + response + " for " + tradeID);
	this.emit('tradeResponse', response, tradeID);
};

// SO
handlers[Language.SO_CacheSubscriptionCheck] = function(body) {
	this.emit('debug', "Requesting SO cache subscription refresh");
	this._send(Language.SO_CacheSubscriptionRefresh, Schema.CMsgSOCacheSubscriptionRefresh, {"owner": this._steam.steamID.getSteamID64()});
};

handlers[Language.SO_CacheSubscribed] = function(body) {
	let proto = decodeProto(Schema.CMsgSOCacheSubscribed, body);
	proto.objects.forEach((cache) => {
		switch (cache.type_id) {
			case 1:
				// Backpack
				let items = cache.object_data.map((object) => {
					let item = decodeProto(Schema.CSOEconItem, object);
					let isNew = (item.inventory >>> 30) & 1;
					item.position = (isNew ? 0 : item.inventory & 0xFFFF);
					return item;
				});

				this.backpack = items;
				this.emit('backpackLoaded');
				break;
			case 7:
				// Account metadata
				let data = decodeProto(Schema.CSOEconGameAccountClient, cache.object_data[0]);
				this.premium = !data.trial_account;
				this.backpackSlots = (data.trial_account ? 50 : 300) + data.additional_backpack_slots;
				this.canSendProfessorSpeks = data.need_to_choose_most_helpful_friend;
				this.emit('accountLoaded');
				break;
			default:
				this.emit('debug', "Unknown SO type " + cache.type_id + " with " + cache.object_data.length + " items");
				break;
		}
	});
};

handlers[Language.SO_Create] = function(body) {
	let proto = decodeProto(Schema.CMsgSOSingleObject, body);
	if (proto.type_id != 1) {
		return; // Not an item
	}

	if (!this.backpack) {
		return; // We don't have our backpack yet!
	}

	let item = decodeProto(Schema.CSOEconItem, proto.object_data);
	item.position = item.inventory & 0x0000FFFF;
	this.backpack.push(item);
	this.emit('itemAcquired', item);
};

handlers[Language.SO_Update] = function(body) {
	let proto = decodeProto(Schema.CMsgSOSingleObject, body);
	this._handleSOUpdate(proto);
};

handlers[Language.SO_UpdateMultiple] = function(body) {
	let items = decodeProto(Schema.CMsgSOMultipleObjects, body).objects;

	items.forEach((item) => {
		this._handleSOUpdate(item);
	});
};

TeamFortress2.prototype._handleSOUpdate = function(so) {
	switch (so.type_id) {
		case 1:
			if (!this.backpack) {
				return; // We don't have our backpack yet!
			}

			let item = decodeProto(Schema.CSOEconItem, so.object_data);
			item.position = item.inventory & 0x0000FFFF;
			for (let i = 0; i < this.backpack.length; i++) {
				if (this.backpack[i].id == item.id) {
					let oldItem = this.backpack[i];
					this.backpack[i] = item;

					this.emit('itemChanged', oldItem, item);
					break;
				}
			}

			break;
		case 7:
			let data = decodeProto(Schema.CSOEconGameAccountClient, so.object_data);
			let oldData = {
				"premium": this.premium,
				"backpackSlots": this.backpackSlots,
				"canSendProfessorSpeks": this.canSendProfessorSpeks
			};

			this.premium = !data.trial_account;
			this.backpackSlots = (data.trial_account ? 50 : 300) + data.additional_backpack_slots;
			this.canSendProfessorSpeks = data.need_to_choose_most_helpful_friend;

			let changed = {};
			let somethingHasChanged = false;
			for (let i in oldData) {
				if (this[i] != oldData[i]) {
					somethingHasChanged = true;
					changed[i] = oldData[i];
				}
			}

			if (somethingHasChanged) {
				// Only emit the event if a property that we're tracking changes
				this.emit('accountUpdate', changed);
			}

			break;
		default:
			this.emit('debug', "Unknown SO type " + so.type_id + " updated");
			break;
	}
};

handlers[Language.SO_Destroy] = function(body) {
	let proto = decodeProto(Schema.CMsgSOSingleObject, body);
	if (proto.type_id != 1) {
		return; // Not an item
	}

	if (!this.backpack) {
		return; // We don't have our backpack yet
	}

	let item = decodeProto(Schema.CSOEconItem, proto.object_data);
	let itemData = null;
	for (let i = 0; i < this.backpack.length; i++) {
		if (this.backpack[i].id == item.id) {
			itemData = this.backpack[i];
			this.backpack.splice(i, 1);
			break;
		}
	}

	this.emit('itemRemoved', itemData);
};

// Item manipulation
handlers[Language.CraftResponse] = function(body) {
	let blueprint = body.readInt16(); // recipe ID
	let unknown = body.readUint32(); // always 0 in my experience

	let idCount = body.readUint16();
	let idList = []; // let's form an array of IDs

	for (let i = 0; i < idCount; i++) {
		let id = body.readUint64().toString(); // grab the next id
		idList.push(id); // item id
	}

	this.emit('craftingComplete', blueprint, idList);
};

// Professor Speks
handlers[Language.FreeTrial_ThankedBySomeone] = function(body) {
	let proto = decodeProto(Schema.CMsgTFThankedBySomeone, body);
	this.emit('professorSpeksReceived', new SteamID(proto.thanker_steam_id));
};

handlers[Language.FreeTrial_ThankedSomeone] = function(body) {
	this.emit('professorSpeksSent');
};

// Game Servers
handlers[Language.GameServer_CreateIdentityResponse] = function(body) {
	let proto = decodeProto(Schema.CMsgGC_GameServer_CreateIdentityResponse, body);
	this.emit('createIdentity', proto.status, proto.account_created, proto.game_server_account_id, proto.game_server_identity_token);
};

handlers[Language.GameServer_ListResponse] = function(body) {
	let proto = decodeProto(Schema.CMsgGC_GameServer_ListResponse, body);
	this.emit('registeredServers', proto.owned_game_servers || []);
};

handlers[Language.GameServer_ResetIdentityResponse] = function(body) {
	let proto = decodeProto(Schema.CMsgGC_GameServer_ResetIdentityResponse, body);
	this.emit('resetIdentity', proto.game_server_identity_token_reset, proto.game_server_account_id, proto.game_server_identity_token);
};

// Spy vs. Engi War
handlers[Language.War_GlobalStatsResponse] = function(body) {
	let proto = decodeProto(Schema.CGCMsgGC_War_GlobalStatsResponse, body);
	let mySides = {}; // they are in orbit
	(proto.side_scores || []).forEach((side) => {
		mySides[side.side] = side.score;
	});

	this.emit('warStats', mySides);
};

function decodeProto(proto, encoded) {
	if (ByteBuffer.isByteBuffer(encoded)) {
		encoded = encoded.toBuffer();
	}

	let decoded = proto.decode(encoded);
	let objNoDefaults = proto.toObject(decoded, {"longs": String});
	let objWithDefaults = proto.toObject(decoded, {"defaults": true, "longs": String});
	return replaceDefaults(objNoDefaults, objWithDefaults);

	function replaceDefaults(noDefaults, withDefaults) {
		if (Array.isArray(withDefaults)) {
			return withDefaults.map((val, idx) => replaceDefaults(noDefaults[idx], val));
		}

		for (let i in withDefaults) {
			if (!withDefaults.hasOwnProperty(i)) {
				continue;
			}

			if (withDefaults[i] && typeof withDefaults[i] === 'object' && !Buffer.isBuffer(withDefaults[i])) {
				// Covers both object and array cases, both of which will work
				// Won't replace empty arrays, but that's desired behavior
				withDefaults[i] = replaceDefaults(noDefaults[i], withDefaults[i]);
			} else if (typeof noDefaults[i] === 'undefined' && isReplaceableDefaultValue(withDefaults[i])) {
				withDefaults[i] = null;
			}
		}

		return withDefaults;
	}

	function isReplaceableDefaultValue(val) {
		if (Buffer.isBuffer(val) && val.length == 0) {
			// empty buffer is replaceable
			return true;
		}

		if (Array.isArray(val)) {
			// empty array is not replaceable (empty repeated fields)
			return false;
		}

		if (val === '0') {
			// Zero as a string is replaceable (64-bit integer)
			return true;
		}

		// Anything falsy is true
		return !val;
	}
}
