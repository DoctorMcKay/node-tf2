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
	var proto = tf_gcmessages.CMsgGCTFSpecificItemBroadcast.parse(body);
	var defindex = proto.itemDefIndex;
	
	var message = null;
	
	if(this.lang && this.itemSchema) {
		var item = this.itemSchema.items[defindex] || {};
		var itemNameKey = item.item_name || '';
		var itemName = this.lang[itemNameKey.substring(1)];
		
		var localizationKey = proto.wasDestruction ? "TF_Event_Item_Deleted" : "TF_Event_Item_Created";
		message = this.lang[localizationKey].replace('%owner%', proto.userName).replace('%item_name%', itemName);
	}
	
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
	var self = this;
	proto.objects.forEach(function(cache) {
		switch(cache.typeId) {
			case 1:
				// Backpack
				var items = cache.objectData.map(function(object) {
					return base_gcmessages.CSOEconItem.parse(object);
				});
				
				self.backpack = items;
				self.emit('backpackLoaded');
				break;
			case 7:
				// Account metadata
				var data = base_gcmessages.CSOEconGameAccountClient.parse(cache.objectData[0]);
				self.premium = !data.trialAccount;
				self.backpackSlots = (data.trialAccount ? 50 : 300) + data.additionalBackpackSlots;
				self.canSendProfessorSpeks = data.needToChooseMostHelpfulFriend;
				self.emit('accountLoaded');
				break;
			default:
				self.emit('debug', "Unknown SO type " + cache.typeId);
				break;
		}
	});
};

handlers[Language.SO_Create] = function(body) {
	var proto = gcsdk_gcmessages.CMsgSOSingleObject.parse(body);
	if(proto.typeId != 1) {
		return; // Not an item
	}
	
	var item = base_gcmessages.CSOEconItem.parse(proto.objectData);
	this.backpack.push(item);
	this.emit('itemAcquired', item);
};

handlers[Language.SO_Update] = function(body) {
	var proto = gcsdk_gcmessages.CMsgSOSingleObject.parse(body);
	this._handleSOUpdate(proto);
};

handlers[Language.SO_UpdateMultiple] = function(body) {
	var items = gcsdk_gcmessages.CMsgSOMultipleObjects.parse(body).objects;
	var self = this;
	
	items.forEach(function(item) {
		self._handleSOUpdate(item);
	});
};

TeamFortress2.prototype._handleSOUpdate = function(so) {
	switch(so.typeId) {
		case 1:
			var item = base_gcmessages.CSOEconItem.parse(so.objectData);
			for(var i = 0; i < this.backpack.length; i++) {
				if(this.backpack[i].id == item.id) {
					var oldItem = this.backpack[i];
					this.backpack[i] = item;
					
					this.emit('itemChanged', oldItem, item);
					break;
				}
			}
			
			break;
		case 7:
			var data = base_gcmessages.CSOEconGameAccountClient.parse(so.objectData);
			this.premium = !data.trialAccount;
			this.backpackSlots = (data.trialAccount ? 50 : 300) + data.additionalBackpackSlots;
			this.canSendProfessorSpeks = data.needToChooseMostHelpfulFriend;
			this.emit('accountUpdate');
			break;
		default:
			this.emit('debug', "Unknown SO type " + so.typeId + " updated");
			break;
	}
}

handlers[Language.SO_Destroy] = function(body) {
	var proto = gcsdk_gcmessages.CMsgSOSingleObject.parse(body);
	if(proto.typeId != 1) {
		return; // Not an item
	}
	
	var item = base_gcmessages.CSOEconItem.parse(proto.objectData);
	var itemData = null;
	for(var i = 0; i < this.backpack.length; i++) {
		if(this.backpack[i].id == item.id) {
			itemData = this.backpack[i];
			this.backpack.splice(i, 1);
			break;
		}
	}
	
	this.emit('itemRemoved', itemData);
};

// Item manipulation
handlers[Language.CraftResponse] = function(body) {
	// Maybe in the future figure out what data is passed here?
	this.emit('craftingComplete');
};