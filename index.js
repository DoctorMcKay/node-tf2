var vdf = require('vdf');
var fs = require('fs');

var protomask = 0x80000000;

var Language = require(__dirname + '/language.js');
var Protos = require(__dirname + '/protos.js');

var base_gcmessages = Protos.base_gcmessages;
var tf_gcmessages = Protos.tf_gcmessages;

module.exports = TeamFortress2;

require('util').inherits(TeamFortress2, require('events').EventEmitter);

function TeamFortress2(steam) {
	this._steam = steam;
	this.haveGCSession = false;
	
	var self = this;
	
	// "extend" the default steam.gamesPlayed function so we can catch when TF2 starts up
	var gamesPlayed = steam.gamesPlayed;
	steam.gamesPlayed = function(appids) {
		if(appids.indexOf(440) != -1 && !self.haveGCSession) {
			self._connect();
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
			self._handlers[type].call(self, body);
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
}

TeamFortress2.prototype._connect = function() {
	var self = this;
	var interval = setInterval(function() {
		// TODO: Clear interval when we shut down TF2 in case the GC connection is never established
		if(self.haveGCSession) {
			clearInterval(interval);
			return;
		}
		
		self._send(Language.ClientHello, base_gcmessages.CMsgClientHello, {});
	}, 5000);
};

TeamFortress2.prototype._send = function(type, protobuf, body) {
	var msgName = type;
	for(var i in Language) {
		if(Language[i] == type) {
			msgName = i;
			break;
		}
	}
	
	this.emit('debug', "Sending GC message " + msgName);
	
	if(protobuf) {
		this._steam.toGC(440, type | protomask, protobuf.serialize(body));
	} else {
		this._steam.toGC(440, type, body);
	}
};

TeamFortress2.prototype.setLang = function(langFile) {
	var lang = vdf.parse(langFile);
	// The vdf parser appears to add some random characters and quotes to the root 'lang' key, so we'll just use a loop to find it
	for(var i in lang) {
		this.lang = lang[i].Tokens;
	}
};

TeamFortress2.prototype.craft = function(items, recipe) {
	var buffer = new Buffer(2 + 2 + (8 * items.length));
	buffer.writeInt16LE(recipe || -2, 0); // -2 is wildcard
	buffer.writeInt16LE(items.length, 2);
	for(var i = 0; i < items.length; i++) {
		buffer.writeUInt64LE(items[i], 4 + (i * 8));
	}
	
	this._send(Language.Craft, null, buffer);
};

TeamFortress2.prototype.trade = function(steamID) {
	var buffer = new Buffer(12);
	buffer.writeUInt32LE(0, 0);
	buffer.writeUInt64LE(steamID, 4);
	this._send(Language.Trading_InitiateTradeRequest, null, buffer);
};

TeamFortress2.prototype.setStyle = function(item, style) {
	var buffer = new Buffer(12);
	buffer.writeUInt64LE(item, 0);
	buffer.writeUInt32LE(style, 8);
	this._send(Language.SetItemStyle, null, buffer);
};

TeamFortress2.prototype.setPosition = function(item, position) {
	var buffer = new Buffer(16);
	buffer.writeUInt64LE(item, 0);
	buffer.writeUInt64LE(position, 8);
	this._send(Language.SetSingleItemPosition, null, buffer);
};

TeamFortress2.prototype.deleteItem = function(item) {
	var buffer = new Buffer(8);
	buffer.writeUInt64LE(item);
	this._send(Language.Delete, null, buffer);
};

TeamFortress2.prototype.wrapItem = function(wrapID, itemID) {
	var buffer = new Buffer(16);
	buffer.writeUInt64LE(wrapID, 0);
	buffer.writeUInt64LE(itemID, 8);
	this._send(Language.GiftWrapItem, null, buffer);
};

TeamFortress2.prototype.deliverGift = function(gift, steamID) {
	var buffer = new Buffer(16);
	buffer.writeUInt64LE(gift, 0);
	buffer.writeUInt64LE(steamID, 8);
	this._send(Language.DeliverGift, null, buffer);
};

TeamFortress2.prototype.unwrapGift = function(gift) {
	var buffer = new Buffer(8);
	buffer.writeUInt64LE(gift);
	this._send(Language.UnwrapGiftRequest, null, buffer);
};

TeamFortress2.prototype.useItem = function(item) {
	this._send(Language.UseItemRequest, base_gcmessages.CMsgUseItem, {"itemId": item});
};

TeamFortress2.prototype.sortBackpack = function(sortType) {
	this._send(Language.SortItems, base_gcmessages.CMsgSortItems, {"sortType": sortType});
};

TeamFortress2.prototype._handlers = {};

require('./enums.js');
require('./handlers.js');