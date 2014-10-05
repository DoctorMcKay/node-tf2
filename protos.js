var fs = require('fs');
var Schema = require('protobuf').Schema;

module.exports = {
	"base_gcmessages": new Schema(fs.readFileSync(__dirname + '/generated/base_gcmessages.desc')),
	"gcsdk_gcmessages": new Schema(fs.readFileSync(__dirname + '/generated/gcsdk_gcmessages.desc')),
	"tf_gcmessages": new Schema(fs.readFileSync(__dirname + '/generated/tf_gcmessages.desc'))
};