var vdf = require('vdf');
var fs = require('fs');

// Prep protobuf stuff
var Schema = require('protobuf').Schema;
var base_gcmessages = new Schema(fs.readFileSync('./generated/base_gcmessages.desc'));
var tf_gcmessages = new Schema(fs.readFileSync('./generated/tf_gcmessages.desc'));
var protomask = 0x80000000;

module.exports = TeamFortress2;

require('util').inherits(TeamFortress2, require('events').EventEmitter);

function TeamFortress2(steam) {
	this._steam = steam;
	this.connectedToGC = false;
}