const ByteBuffer = require('bytebuffer');
const Steam = require('steam');
const SteamID = require('steamid');
const VDF = require('vdf');

const Language = require('./language.js');
const Schema = require('./protobufs/generated/_load.js');

module.exports = TeamFortress2;

require('util').inherits(TeamFortress2, require('events').EventEmitter);

function TeamFortress2(steam) {
	this._steam = steam.client || steam._client; // SteamClient is _client in the official SteamUser and client in node-steam-user
	this._gc = new Steam.SteamGameCoordinator(this._steam, 440);
	this.haveGCSession = false;
	this._hadGCSession = false;
	this._isInTF2 = false;

	let self = this;

	this._gc.on('message', function(header, body, callback) {
		let protobuf = !!header.proto;
		let handled = false;

		if (self._handlers[header.msg]) {
			handled = true;
			self._handlers[header.msg].call(self, protobuf ? body : ByteBuffer.wrap(body, ByteBuffer.LITTLE_ENDIAN));
		}

		let msgName = header.msg;
		for (let i in Language) {
			if (Language.hasOwnProperty(i) && Language[i] == header.msg) {
				msgName = i;
				break;
			}
		}

		self.emit('debug', "Got " + (handled ? "handled" : "unhandled") + " GC message " + msgName + (protobuf ? " (protobuf)" : ""));
	});

	// "extend" the default steam.gamesPlayed function so we can catch when TF2 starts up
	let gamesPlayed = steam.gamesPlayed;
	steam.gamesPlayed = function(input) {
		let appids = input;

		if (appids.games_played) {
			appids = appids.games_played;
		}

		if (!(appids instanceof Array)) {
			appids = [appids];
		}

		self._isInTF2 = false;
		for (let i = 0; i < appids.length; i++) {
			if (appids[i] == 440 || appids[i].game_id == 440) {
				self._isInTF2 = true;
				break;
			}
		}

		if (self._isInTF2) {
			if (!self.haveGCSession) {
				self._connect();
			}
		} else {
			if (self._helloInterval) {
				clearInterval(self._helloInterval);
				self._helloInterval = null;
			}

			self.haveGCSession = false;
			self._hadGCSession = false;
		}

		gamesPlayed.call(steam, appids);
	};

	this._steam.on('loggedOff', function() {
		self._isInTF2 = false;
		self._hadGCSession = self.haveGCSession;
		if (self.haveGCSession) {
			self.emit('disconnectedFromGC', TeamFortress2.GCGoodbyeReason.NO_SESSION);
			self.haveGCSession = false;
		}
	});

	this._steam.on('error', function(e) {
		self._isInTF2 = false;
		self._hadGCSession = false;
		if (self.haveGCSession) {
			self.emit('disconnectedFromGC', TeamFortress2.GCGoodbyeReason.NO_SESSION);
			self.haveGCSession = false;
		}
	});

	this._steam.on('logOnResponse', function(response) {
		if (response.eresult == Steam.EResult.OK && self._hadGCSession) {
			self._connect();
			self._hadGCSession = false;
		}
	});
}

TeamFortress2.prototype._connect = function() {
	if (!this._isInTF2 || this._helloInterval) {
		return; // We're not in TF2 or we're already trying to connect
	}

	let self = this;

	function sendHello() {
		if (self.haveGCSession) {
			clearInterval(self._helloInterval);
			self._helloInterval = null;
			return;
		}

		if (self._isServer()) {
			self._send(Language.ServerHello, Schema.CMsgServerHello, {});
		} else {
			self._send(Language.ClientHello, Schema.CMsgClientHello, {});
		}
	}

	this._helloInterval = setInterval(sendHello, 5000);
	sendHello();
};

TeamFortress2.prototype._isServer = function() {
	let sid = new SteamID(this._steam.steamID);
	return (sid.type == SteamID.Type.ANON_GAMESERVER || sid.type == SteamID.Type.GAMESERVER);
};

TeamFortress2.prototype._send = function(type, protobuf, body) {
	if (!this._steam.loggedOn) {
		return false;
	}

	let msgName = type;
	for (let i in Language) {
		if (Language[i] == type) {
			msgName = i;
			break;
		}
	}

	this.emit('debug', "Sending GC message " + msgName);

	if (protobuf) {
		this._gc.send({"msg": type, "proto": {}}, protobuf.encode(body).finish());
	} else {
		// This is a ByteBuffer
		this._gc.send({"msg": type}, body.flip().toBuffer());
	}

	return true;
};

TeamFortress2.prototype.setLang = function(langFile) {
	let lang = VDF.parse(langFile);
	// The vdf parser appears to add some random characters and quotes to the root 'lang' key, so we'll just use a loop to find it
	for (let i in lang) {
		this.lang = lang[i].Tokens;
	}
};

TeamFortress2.prototype.craft = function(items, recipe) {
	let buffer = new ByteBuffer(2 + 2 + (8 * items.length), ByteBuffer.LITTLE_ENDIAN);
	buffer.writeInt16(recipe || -2); // -2 is wildcard
	buffer.writeInt16(items.length);
	for (let i = 0; i < items.length; i++) {
		buffer.writeUint64(coerceToLong(items[i]));
	}

	this._send(Language.Craft, null, buffer);
};

TeamFortress2.prototype.trade = function(steamID) {
	let buffer = new ByteBuffer(12, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint32(0);
	buffer.writeUint64(coerceToLong(steamID));
	this._send(Language.Trading_InitiateTradeRequest, null, buffer);
};

TeamFortress2.prototype.cancelTradeRequest = function() {
	let buffer = new ByteBuffer(0, ByteBuffer.LITTLE_ENDIAN);
	this._send(Language.Trading_CancelSession, null, buffer);
};

TeamFortress2.prototype.respondToTrade = function(tradeID, accept) {
	let buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint32(accept ? TeamFortress2.TradeResponse.Accepted : TeamFortress2.TradeResponse.Declined);
	buffer.writeUint32(tradeID);
	this._send(Language.Trading_InitiateTradeResponse, null, buffer);
};

TeamFortress2.prototype.setStyle = function(item, style) {
	let buffer = new ByteBuffer(12, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(item));
	buffer.writeUint32(style);
	this._send(Language.SetItemStyle, null, buffer);
};

TeamFortress2.prototype.setPosition = function(item, position) {
	let buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(item));
	buffer.writeUint64(coerceToLong(position));
	this._send(Language.SetSingleItemPosition, null, buffer);
};

TeamFortress2.prototype.setPositions = function(items) {
	this._send(Language.SetItemPositions, Schema.CMsgSetItemPositions, {"item_positions": items});
};

TeamFortress2.prototype.deleteItem = function(item) {
	let buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(item));
	this._send(Language.Delete, null, buffer);
};

TeamFortress2.prototype.wrapItem = function(wrapID, itemID) {
	let buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(wrapID));
	buffer.writeUint64(coerceToLong(itemID));
	this._send(Language.GiftWrapItem, null, buffer);
};

TeamFortress2.prototype.deliverGift = function(gift, steamID) {
	let buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(gift));
	buffer.writeUint64(coerceToLong(steamID));
	this._send(Language.DeliverGift, null, buffer);
};

TeamFortress2.prototype.unwrapGift = function(gift) {
	let buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(gift));
	this._send(Language.UnwrapGiftRequest, null, buffer);
};

TeamFortress2.prototype.useItem = function(item) {
	this._send(Language.UseItemRequest, Schema.CMsgUseItem, {"item_id": item});
};

TeamFortress2.prototype.sortBackpack = function(sortType) {
	this._send(Language.SortItems, Schema.CMsgSortItems, {"sort_type": sortType});
};

TeamFortress2.prototype.sendProfessorSpeks = function(steamID) {
	this._send(Language.FreeTrial_ChooseMostHelpfulFriend, Schema.CMsgTFFreeTrialChooseMostHelpfulFriend, {"account_id_friend": new SteamID(steamID).accountid});
};

TeamFortress2.prototype.createServerIdentity = function() {
	this._send(Language.GameServer_CreateIdentity, Schema.CMsgGC_GameServer_CreateIdentity, {"account_id": new SteamID(this._steam.steamID).accountid});
};

TeamFortress2.prototype.getRegisteredServers = function() {
	this._send(Language.GameServer_List, Schema.CMsgGC_GameServer_List, {"account_id": new SteamID(this._steam.steamID).accountid});
};

TeamFortress2.prototype.resetServerIdentity = function(id) {
	this._send(Language.GameServer_ResetIdentity, Schema.CMsgGC_GameServer_ResetIdentity, {"game_server_account_id": id});
};

TeamFortress2.prototype.openCrate = function(keyID, crateID) {
	let buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(keyID));
	buffer.writeUint64(coerceToLong(crateID));
	this._send(Language.UnlockCrate, null, buffer);
};

TeamFortress2.prototype.equipItem = function(itemID, classID, slot) {
	this._send(Language.AdjustItemEquippedState, Schema.CMsgAdjustItemEquippedState, {
		"item_id": itemID,
		"new_class": classID,
		"new_slot": slot
	});
};

TeamFortress2.prototype.requestWarStats = function(warID, callback) {
	if (typeof warID === 'function') {
		callback = warID;
		warID = null;
	}

	this._send(Language.War_RequestGlobalStats, Schema.CGCMsgGC_War_RequestGlobalStats, {"war_id": warID || TeamFortress2.War.HeavyVsPyro});

	if (callback) {
		this.once('warStats', callback);
	}
};

TeamFortress2.prototype._handlers = {};

function coerceToLong(num, signed) {
	return typeof num === 'string' ? new ByteBuffer.Long.fromString(num, !signed, 10) : num;
}

require('./enums.js');
require('./handlers.js');
