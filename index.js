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

function TeamFortress2(steam) {
	this._steam = steam;
	this.haveGCSession = false;
	
	var self = this;
	
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
		if(self.haveGCSession) {
			clearInterval(interval);
			return;
		}
		
		self._send(Language.ClientHello, base_gcmessages.CMsgClientHello, {});
	}, 1000);
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
	
	// TODO: Add support for non-protobuf messages
	this._steam.toGC(440, type | protomask, protobuf.serialize(body));
};

TeamFortress2.prototype.setLang = function(langFile) {
	var lang = vdf.parse(langFile);
	// The vdf parser appears to add some random characters and quotes to the root 'lang' key, so we'll just use a loop to find it
	for(var i in lang) {
		this.lang = lang[i].Tokens;
	}
};

TeamFortress2.prototype._handlers = {};

require('./handlers.js');