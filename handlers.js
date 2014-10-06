var vdf = require('vdf');
var request = require('request');
var fs = require('fs');

var TeamFortress2 = require('./index.js');
var Language = require(__dirname + '/language.js');
var Protos = require(__dirname + '/protos.js');

var base_gcmessages = Protos.base_gcmessages;
var gcsdk_gcmessages = Protos.gcsdk_gcmessages;
var tf_gcmessages = Protos.tf_gcmessages;

var handlers = TeamFortress2.prototype._handlers;

// ClientWelcome and ClientGoodbye
handlers[Language.ClientWelcome] = function(body) {
	var proto = base_gcmessages.CMsgClientWelcome.parse(body);
	this.haveGCSession = true;
	this.emit('connectedToGC', proto.version);
};

handlers[Language.ClientGoodbye] = function(body) {
	var proto = base_gcmessages.CMsgClientGoodbye.parse(body);
	this.haveGCSession = false;
	this.emit('disconnectedFromGC', proto.reason);
};

// Item schema
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
		
		self.itemSchema = vdf.parse(body).items_game;
		self.emit('itemSchemaLoaded');
	});
};

// Various notifications (why do we need three distinct interfaces??)
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

handlers[Language.TFSpecificItemBroadcast] = function(body) {
	if(!this.lang || !this.itemSchema) {
		// We only handle this if we have a localization file and a schema
		return;
	}
	
	var proto = tf_gcmessages.CMsgGCTFSpecificItemBroadcast.parse(body);
	var defindex = proto.itemDefIndex;
	var item = this.itemSchema.items[defindex] || {};
	var itemNameKey = item.item_name || '';
	var itemName = this.lang[itemNameKey.substring(1)];
	
	var localizationKey = proto.wasDestruction ? "TF_Event_Item_Deleted" : "TF_Event_Item_Created";
	var message = this.lang[localizationKey];
	
	message = message.replace('%owner%', proto.userName).replace('%item_name%', itemName);
	
	this.emit('itemBroadcast', message, proto.userName, proto.wasDestruction, defindex);
};

handlers[Language.Trading_InitiateTradeResponse] = function(body) {
	var response = body.readUInt32LE(0);
	this.emit('debug', "Got trade response " + response);
	this.emit('tradeResponse', response);
};

// SO
handlers[Language.SO_CacheSubscriptionCheck] = function(body) {
	this.emit('debug', "Requesting SO cache subscription refresh");
	this._send(Language.SO_CacheSubscriptionRefresh, gcsdk_gcmessages.CMsgSOCacheSubscriptionRefresh, {"owner": this._steam.steamID});
};

handlers[Language.SO_CacheSubscribed] = function(body) {
	var proto = gcsdk_gcmessages.CMsgSOCacheSubscribed.parse(body);
	var items;
	proto.objects.forEach(function(cache) {
		if(cache.typeId != 1) {
			return; // Not the inventory cache
		}
		
		items = cache.objectData.map(function(object) {
			return base_gcmessages.CSOEconItem.parse(object);
		});
	});
	
	this.backpack = items;
	this.emit('backpackLoaded');
};

handlers[Language.SO_Create] = function(body) {
	var item = base_gcmessages.CSOEconItem.parse(gcsdk_gcmessages.CMsgSOSingleObject.parse(body).objectData);
	this.backpack.push(item);
	this.emit('itemAcquired', item);
};

handlers[Language.SO_Destroy] = function(body) {
	var item = base_gcmessages.CSOEconItem.parse(gcsdk_gcmessages.CMsgSOSingleObject.parse(body).objectData);
	for(var i = 0; i < this.backpack.length; i++) {
		if(this.backpack[i].id == item.id) {
			this.backpack.splice(i, 1);
			break;
		}
	}
	
	this.emit('itemRemoved', item.id);
};