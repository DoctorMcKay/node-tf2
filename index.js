var vdf = require('vdf');
var fs = require('fs');
var SteamID = require('steamid');
var ByteBuffer = require('bytebuffer');

var protomask = 0x80000000;

var Language = require('./language.js');
var Protos = require('./protos.js');

module.exports = TeamFortress2;

require('util').inherits(TeamFortress2, require('events').EventEmitter);

function TeamFortress2(steam) {
	this._steam = steam;
	this.haveGCSession = false;
	this._hadGCSession = false;
	this._isInTF2 = false;
	
	var self = this;
	
	// "extend" the default steam.gamesPlayed function so we can catch when TF2 starts up
	var gamesPlayed = steam.gamesPlayed;
	steam.gamesPlayed = function(appids) {
		if(appids.indexOf(440) != -1) {
			self._isInTF2 = true;
			if(!self.haveGCSession) {
				self._connect();
			}
		} else {
			if(self._helloInterval) {
				clearInterval(self._helloInterval);
				self._helloInterval = null;
			}
			
			self._isInTF2 = false;
			self.haveGCSession = false;
			self._hadGCSession = false;
		}
		
		gamesPlayed.call(steam, appids);
	};
	
	steam.on('fromGC', function(appID, type, body) {
		if(appID != 440) {
			// Not from the TF2 GC
			return;
		}
		
		var protobuf = !!(type & protomask);
		type &= ~protomask;
		
		if(self._handlers[type]) {
			self._handlers[type].call(self, protobuf ? body : ByteBuffer.wrap(body, ByteBuffer.LITTLE_ENDIAN));
		} else {
			var msgName = type;
			for(var i in Language) {
				if(Language[i] == type) {
					msgName = i;
					break;
				}
			}
			
			self.emit('debug', "Got unhandled GC message " + msgName + (protobuf ? " (protobuf)" : ""));
		}
	});
	
	steam.on('loggedOff', function() {
		self._isInTF2 = false;
		self._hadGCSession = self.haveGCSession;
		if(self.haveGCSession) {
			self.emit('disconnectedFromGC', TeamFortress2.GCGoodbyeReason.NO_SESSION);
			self.haveGCSession = false;
		}
	});
	
	steam.on('error', function(e) {
		self._isInTF2 = false;
		self._hadGCSession = false;
		if(self.haveGCSession) {
			self.emit('disconnectedFromGC', TeamFortress2.GCGoodbyeReason.NO_SESSION);
			self.haveGCSession = false;
		}
	});
	
	steam.on('loggedOn', function() {
		if(self._hadGCSession) {
			self._connect();
			self._hadGCSession = false;
		}
	});
}

TeamFortress2.prototype._connect = function() {
	if(!this._isInTF2 || this._helloInterval) {
		return; // We're not in TF2 or we're already trying to connect
	}
	
	var self = this;
	this._helloInterval = setInterval(function() {
		if(self.haveGCSession) {
			clearInterval(self._helloInterval);
			self._helloInterval = null;
			return;
		}
		
		self._send(Language.ClientHello, Protos.CMsgClientHello, {});
	}, 5000);
};

TeamFortress2.prototype._send = function(type, protobuf, body) {
	if(!this._steam.loggedOn) {
		return false;
	}
	
	var msgName = type;
	for(var i in Language) {
		if(Language[i] == type) {
			msgName = i;
			break;
		}
	}
	
	this.emit('debug', "Sending GC message " + msgName);
	
	if(protobuf) {
		this._steam.toGC(440, type | protomask, (new protobuf(body)).toBuffer());
	} else {
		// This is a ByteBuffer
		this._steam.toGC(440, type, body.flip().toBuffer());
	}
	
	return true;
};

TeamFortress2.prototype.setLang = function(langFile) {
	var lang = vdf.parse(langFile);
	// The vdf parser appears to add some random characters and quotes to the root 'lang' key, so we'll just use a loop to find it
	for(var i in lang) {
		this.lang = lang[i].Tokens;
	}
};

TeamFortress2.prototype.craft = function(items, recipe) {
	var buffer = new ByteBuffer(2 + 2 + (8 * items.length), ByteBuffer.LITTLE_ENDIAN);
	buffer.writeInt16(recipe || -2); // -2 is wildcard
	buffer.writeInt16(items.length);
	for(var i = 0; i < items.length; i++) {
		buffer.writeUint64(items[i]);
	}
	
	this._send(Language.Craft, null, buffer);
};

TeamFortress2.prototype.trade = function(steamID) {
	var buffer = new ByteBuffer(12, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint32(0);
	buffer.writeUint64(steamID);
	this._send(Language.Trading_InitiateTradeRequest, null, buffer);
};

TeamFortress2.prototype.cancelTradeRequest = function() {
	var buffer = new ByteBuffer(0, ByteBuffer.LITTLE_ENDIAN);
	this._send(Language.Trading_CancelSession, null, buffer);
};

TeamFortress2.prototype.respondToTrade = function(tradeID, accept) {
	var buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint32(accept ? TeamFortress2.TradeResponse.Accepted : TeamFortress2.TradeResponse.Declined);
	buffer.writeUint32(tradeID);
	this._send(Language.Trading_InitiateTradeResponse, null, buffer);
};

TeamFortress2.prototype.setStyle = function(item, style) {
	var buffer = new ByteBuffer(12, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(item);
	buffer.writeUint32(style);
	this._send(Language.SetItemStyle, null, buffer);
};

TeamFortress2.prototype.setPosition = function(item, position) {
	var buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(item);
	buffer.writeUint64(position);
	this._send(Language.SetSingleItemPosition, null, buffer);
};

TeamFortress2.prototype.setPositions = function(items) {
	this._send(Language.SetItemPositions, Protos.CMsgSetItemPositions, {"itemPositions": items});
};

TeamFortress2.prototype.deleteItem = function(item) {
	var buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(item);
	this._send(Language.Delete, null, buffer);
};

TeamFortress2.prototype.wrapItem = function(wrapID, itemID) {
	var buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(wrapID);
	buffer.writeUint64(itemID);
	this._send(Language.GiftWrapItem, null, buffer);
};

TeamFortress2.prototype.deliverGift = function(gift, steamID) {
	var buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(gift);
	buffer.writeUint64(steamID);
	this._send(Language.DeliverGift, null, buffer);
};

TeamFortress2.prototype.unwrapGift = function(gift) {
	var buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(gift);
	this._send(Language.UnwrapGiftRequest, null, buffer);
};

TeamFortress2.prototype.useItem = function(item) {
	this._send(Language.UseItemRequest, Protos.CMsgUseItem, {"itemId": item});
};

TeamFortress2.prototype.sortBackpack = function(sortType) {
	this._send(Language.SortItems, Protos.CMsgSortItems, {"sortType": sortType});
};

TeamFortress2.prototype.sendProfessorSpeks = function(steamID) {
	this._send(Language.FreeTrial_ChooseMostHelpfulFriend, Protos.CMsgTFFreeTrialChooseMostHelpfulFriend, {"accountIdFriend": new SteamID(steamID).accountid});
};

TeamFortress2.prototype.createServerIdentity = function() {
	this._send(Language.GameServer_CreateIdentity, Protos.CMsgGC_GameServer_CreateIdentity, {"accountId": new SteamID(this._steam.steamID).accountid});
};

TeamFortress2.prototype.getRegisteredServers = function() {
	this._send(Language.GameServer_List, Protos.CMsgGC_GameServer_List, {"accountId": new SteamID(this._steam.steamID).accountid});
};

TeamFortress2.prototype.resetServerIdentity = function(id) {
	this._send(Language.GameServer_ResetIdentity, Protos.CMsgGC_GameServer_ResetIdentity, {"gameServerAccountId": id});
};

TeamFortress2.prototype.openCrate = function(keyID, crateID) {
	var buffer = new ByteBuffer(16, ByteBuffer.LITTLE_ENDIAN);
	buffer.writeUint64(keyID);
	buffer.writeUint64(crateID);
	this._send(Language.UnlockCrate, null, buffer);
};

TeamFortress2.prototype.equipItem = function(itemID, classID, slot) {
	this._send(Language.AdjustItemEquippedState, Protos.CMsgAdjustItemEquippedState, {"itemId": itemID, "newClass": classID, "newSlot": slot});
};

TeamFortress2.prototype.requestSpyVsEngiWarStats = function() {
	this._send(Language.SpyVsEngyWar_RequestGlobalStats, Protos.CGCMsgGC_SpyVsEngyWar_RequestGlobalStats, {});
};

TeamFortress2.prototype._handlers = {};

require('./enums.js');
require('./handlers.js');