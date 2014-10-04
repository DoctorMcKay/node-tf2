var vdf = require('vdf');
var request = require('request');
var fs = require('fs');

var TeamFortress2 = require('./index.js');
var Language = require(__dirname + '/language.js');

// Prep protobuf stuff
var Schema = require('protobuf').Schema;
var base_gcmessages = new Schema(fs.readFileSync(__dirname + '/generated/base_gcmessages.desc'));
var tf_gcmessages = new Schema(fs.readFileSync(__dirname + '/generated/tf_gcmessages.desc'));

var handlers = TeamFortress2.prototype._handlers;

handlers[Language.ClientWelcome] = function(body) {
	var proto = base_gcmessages.CMsgClientWelcome.parse(body);
	this.emit('connectedToGC', proto.version);
};

handlers[Language.ClientGoodbye] = function(body) {
	var proto = base_gcmessages.CMsgClientGoodbye.parse(body);
	this.emit('disconnectedFromGC', proto.reason);
};

handlers[Language.UpdateItemSchema] = function(body) {
	var proto = base_gcmessages.CMsgUpdateItemSchema.parse(body);
	this.emit('itemSchema', proto.itemSchemaVersion.toString(16).toUpperCase(), proto.itemsGameUrl);
	
	var self = this;
	request(proto.itemsGameUrl, function(err, response, body) {
		if(err) {
			self.emit('debug', "Unable to download items_game.txt: " + err);
			self.emit('itemSchemaError', err);
			return;
		}
		
		self.itemSchema = vdf.parse(body);
		self.emit('itemSchemaLoaded');
	});
};

handlers[Language.SystemMessage] = function(body) {
	var proto = base_gcmessages.CMsgSystemBroadcast.parse(body);
	this.emit('systemMessage', proto.message);
};

handlers[Language.ClientDisplayNotification] = function(body) {
	if(!this.lang) {
		// We only handle this if we have a localization file
		return;
	}
	
	var proto = base_gcmessages.CMsgGCClientDisplayNotification.parse(body);
	var title = this.lang[proto.notificationTitleLocalizationKey.substring(1)];
	var body = (this.lang[proto.notificationBodyLocalizationKey.substring(1)] || '').replace(new RegExp('[\u0001|\u0002]', 'g'), '');
	body = body.replace(/\\"/g, '"'); // The vdf parser appears to not properly parse escaped quotes
	
	var replacement;
	for(var i = 0; i < proto.bodySubstringKeys.length; i++) {
		replacement = proto.bodySubstringValues[i];
		if(replacement.charAt(0) == '#') {
			replacement = this.lang[replacement.substring(1)];
		}
		
		body = body.replace('%' + proto.bodySubstringKeys[i] + '%', replacement);
	}
	
	this.emit('displayNotification', title, body);
};