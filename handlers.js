var vdf = require('vdf');
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
});

handlers[Language.UpdateItemSchema] = function(body) {
	var proto = base_gcmessages.CMsgUpdateItemSchema.parse(body);
	this.emit('itemSchema', proto.itemSchemaVersion.toString(16).toUpperCase(), proto.itemsGameUrl);
};

handlers[Language.SystemMessage] = function(body) {
	var proto = base_gcmessages.CMsgSystemBroadcast.parse(body);
	this.emit('systemMessage', proto.message);
};