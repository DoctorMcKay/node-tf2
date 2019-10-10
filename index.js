const ByteBuffer = require('bytebuffer');
const EventEmitter = require('events').EventEmitter;
const SteamID = require('steamid');
const Util = require('util');
const VDF = require('vdf');

const Language = require('./language.js');
const Schema = require('./protobufs/generated/_load.js');

const STEAM_APPID = 440;

module.exports = TeamFortress2;

Util.inherits(TeamFortress2, EventEmitter);

function TeamFortress2(steam) {
	if (steam.packageName != 'steam-user' || !steam.packageVersion || !steam.constructor) {
		throw new Error('tf2 v3 only supports steam-user v4.2.0 or later.');
	} else {
		let parts = steam.packageVersion.split('.');
		if (parts[0] < 4 || parts[1] < 2) {
			throw new Error(`node-tf2 v3 only supports node-steam-user v4.2.0 or later. ${steam.constructor.name} v${steam.packageVersion} given.`);
		}
	}

	this._steam = steam;
	this.haveGCSession = false;
	this._isInTF2 = false;

	this._steam.on('receivedFromGC', (appid, msgType, payload) => {
		if (appid != STEAM_APPID) {
			return; // we don't care
		}

		let isProtobuf = !Buffer.isBuffer(payload);
		let handler = null;

		if (this._handlers[msgType]) {
			handler = this._handlers[msgType];
		}

		let msgName = msgType;
		for (let i in Language) {
			if (Language.hasOwnProperty(i) && Language[i] == msgType) {
				msgName = i;
				break;
			}
		}

		this.emit('debug', "Got " + (handler ? "handled" : "unhandled") + " GC message " + msgName + (isProtobuf ? " (protobuf)" : ""));
		if (handler) {
			handler.call(this, isProtobuf ? payload : ByteBuffer.wrap(payload, ByteBuffer.LITTLE_ENDIAN));
		}
	});

	this._steam.on('appLaunched', (appid) => {
		if (this._isInTF2) {
			return; // we don't care if it was launched again
		}

		if (appid == STEAM_APPID) {
			this._isInTF2 = true;
			if (!this.haveGCSession) {
				this._connect();
			}
		}
	});

	let handleAppQuit = (emitDisconnectEvent) => {
		if (this._helloInterval) {
			clearInterval(this._helloInterval);
			this._helloInterval = null;
		}

		if (this.haveGCSession && emitDisconnectEvent) {
			this.emit('disconnectedFromGC', TeamFortress2.GCGoodbyeReason.NO_SESSION);
		}

		this._isInTF2 = false;
		this.haveGCSession = false;
	};

	this._steam.on('appQuit', (appid) => {
		if (!this._isInTF2) {
			return;
		}

		if (appid == STEAM_APPID) {
			handleAppQuit(false);
		}
	});

	this._steam.on('disconnected', () => {
		handleAppQuit(true);
	});

	this._steam.on('error', (err) => {
		handleAppQuit(true);
	});
}

TeamFortress2.prototype._connect = function() {
	if (!this._isInTF2 || this._helloInterval) {
		return; // We're not in TF2 or we're already trying to connect
	}

	let sendHello = () => {
		if (this.haveGCSession) {
			clearInterval(this._helloInterval);
			this._helloInterval = null;
			return;
		}

		if (this._isServer()) {
			this._send(Language.ServerHello, Schema.CMsgServerHello, {});
		} else {
			this._send(Language.ClientHello, Schema.CMsgClientHello, {});
		}
	};

	this._helloInterval = setInterval(sendHello, 5000);
	sendHello();
};

TeamFortress2.prototype._isServer = function() {
	let serverTypes = [SteamID.Type.ANON_GAMESERVER, SteamID.Type.GAMESERVER];
	return this._steam.steamID && serverTypes.includes(this._steam.steamID.type);
};

TeamFortress2.prototype._send = function(type, protobuf, body) {
	if (!this._steam.steamID) {
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
		this._steam.sendToGC(STEAM_APPID, type, {}, protobuf.encode(body).finish());
	} else {
		// This is a ByteBuffer
		this._steam.sendToGC(STEAM_APPID, type, null, body.flip().toBuffer());
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
	if (typeof steamID == 'string') {
		steamID = new SteamID(steamID);
	}

	let buffer = new ByteBuffer(12, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint32(0);
	buffer.writeUint64(coerceToLong(steamID.getSteamID64()));
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
	if (typeof steamID == 'string') {
		steamID = new SteamID(steamID);
	}

	let buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(coerceToLong(gift));
	buffer.writeUint64(coerceToLong(steamID.getSteamID64()));
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
	if (typeof steamID == 'string') {
		steamID = new SteamID(steamID);
	}

	this._send(Language.FreeTrial_ChooseMostHelpfulFriend, Schema.CMsgTFFreeTrialChooseMostHelpfulFriend, {"account_id_friend": steamID.accountid});
};

TeamFortress2.prototype.createServerIdentity = function() {
	this._send(Language.GameServer_CreateIdentity, Schema.CMsgGC_GameServer_CreateIdentity, {"account_id": this._steam.steamID.accountid});
};

TeamFortress2.prototype.getRegisteredServers = function() {
	this._send(Language.GameServer_List, Schema.CMsgGC_GameServer_List, {"account_id": this._steam.steamID.accountid});
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
