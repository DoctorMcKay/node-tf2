var protomask = 0x80000000;

var Language = require(__dirname + '/language.js');

module.exports = TeamFortress2;

require('util').inherits(TeamFortress2, require('events').EventEmitter);

function TeamFortress2(steam) {
	this._steam = steam;
	this.haveGCSession = false;
	
	var self = this;
	
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
	this._steam.toGC(440, type, protobuf.serialize(body));
};

TeamFortress2.prototype._handlers = {};

require('./handlers.js');