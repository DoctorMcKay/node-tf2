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