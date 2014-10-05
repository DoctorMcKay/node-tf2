var vdf = require('vdf');
var fs = require('fs');

var protomask = 0x80000000;

var Language = require(__dirname + '/language.js');
var Protos = require(__dirname + '/protos.js');

var base_gcmessages = Protos.base_gcmessages;
var tf_gcmessages = Protos.tf_gcmessages;

module.exports = TeamFortress2;

require('util').inherits(TeamFortress2, require('events').EventEmitter);

TeamFortress2.GCGoodbyeReason = {
	GC_GOING_DOWN: 1,
	NO_SESSION: 2
};

TeamFortress2.TradeResponse = {
	Accepted: 0,
	Declined: 1,
	TradeBannedInitiator: 2,
	TradeBannedTarget: 3,
	TargetAlreadyTrading: 4,
	Disabled: 5,
	NotLoggedIn: 6,
	Cancel: 7,
	TooSoon: 8,
	TooSoonPenalty: 9,
	ConnectionFailed: 10,
	AlreadyTrading: 11,
	AlreadyHasTradeRequest: 12,
	NoResponse: 13,
	CyberCafeInitiator: 14,
	CyberCafeTarget: 15,
	SchoolLabInitiator: 16,
	SchoolLabTarget: 16,
	InitiatorBlockedTarget: 18,
	InitiatorNeedsVerifiedEmail: 20,
	InitiatorNeedsSteamGuard: 21,
	TargetAccountCannotTrade: 22,
	InitiatorSteamGuardDuration: 23,
	InitiatorPasswordResetProbation: 24,
	InitiatorNewDeviceCooldown: 25,
	OKToDeliver: 50
};

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

TeamFortress2.prototype.trade = function(steamID) {
	var buffer = new Buffer(12);
	buffer.writeUInt32LE(0, 0);
	buffer.writeUInt64LE(steamID, 4);
	this._send(Language.Trading_InitiateTradeRequest, null, buffer);
};

TeamFortress2.prototype._handlers = {};

require('./handlers.js');