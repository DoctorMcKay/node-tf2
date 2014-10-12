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
	var text = (this.lang[proto.notificationBodyLocalizationKey.substring(1)] || '').replace(new RegExp('[\u0001|\u0002]', 'g'), '');
	text = text.replace(/\\"/g, '"'); // The vdf parser appears to not properly parse escaped quotes
	
	var replacement;
	for(var i = 0; i < proto.bodySubstringKeys.length; i++) {
		replacement = proto.bodySubstringValues[i];
		if(replacement.charAt(0) == '#') {
			replacement = this.lang[replacement.substring(1)];
		}
		
		text = text.replace('%' + proto.bodySubstringKeys[i] + '%', replacement);
	}
	
	this.emit('displayNotification', title, text);
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

// Trading
handlers[Language.Trading_InitiateTradeRequest] = function(body) {
	var tradeID = body.readUInt32LE(0);
	var steamID = body.readUInt64LE(4);
	this.emit('tradeRequest', steamID, tradeID);
};

handlers[Language.Trading_InitiateTradeResponse] = function(body) {
	var response = body.readUInt32LE(0);
	var tradeID = body.readUInt32LE(4);
	this.emit('debug', "Got trade response " + response + " for " + tradeID);
	this.emit('tradeResponse', response, tradeID);
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
				self.emit('debug', "Unknown SO type " + cache.typeId + " with " + cache.objectData.length + " items");
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
			if(!this.backpack) {
				return; // We don't have our backpack yet!
			}
			
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
			var oldData = {
				"premium": this.premium,
				"backpackSlots": this.backpackSlots,
				"canSendProfessorSpeks": this.canSendProfessorSpeks
			};
			
			this.premium = !data.trialAccount;
			this.backpackSlots = (data.trialAccount ? 50 : 300) + data.additionalBackpackSlots;
			this.canSendProfessorSpeks = data.needToChooseMostHelpfulFriend;
			
			var changed = {};
			var somethingHasChanged = false;
			for(var i in oldData) {
				if(this[i] != oldData[i]) {
					somethingHasChanged = true;
					changed[i] = oldData[i];
				}
			}
			
			if(somethingHasChanged) {
				// Only emit the event if a property that we're tracking changes
				this.emit('accountUpdate', changed);
			}
			
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
	var sz = body.length;
	var blueprint = body.readUInt16LE(0);//recipe #
	var unk = body.readUInt64LE(2);//inventory token maybe? https://wiki.teamfortress.com/wiki/WebAPI/GetPlayerItems#Inventory_token
	//header is 8 bytes
	var id_cnt = ((sz-8)/8);//figure out how many id's the body contains
	var id_list = [];//lets form an array of id's
	for(var i=0; i<id_cnt; i++)
	{
		var id = body.readUInt64LE(8+(i*8));//grab the next id
		id_list.push( id );//item id
	}
		
	this.emit('craftingComplete', blueprint, id_list);
};

// Professor Speks
handlers[Language.FreeTrial_ThankedBySomeone] = function(body) {
	var proto = tf_gcmessages.CMsgTFThankedBySomeone.parse(body);
	this.emit('professorSpeksReceived', proto.thankerSteamId);
};

handlers[Language.FreeTrial_ThankedSomeone] = function(body) {
	this.emit('professorSpeksSent');
};

// Game Servers
handlers[Language.GameServer_CreateIdentityResponse] = function(body) {
	var proto = tf_gcmessages.CMsgGC_GameServer_CreateIdentityResponse.parse(body);
	this.emit('createIdentity', proto.status, proto.accountCreated, proto.gameServerAccountId, proto.gameServerIdentityToken);
};

handlers[Language.GameServer_ListResponse] = function(body) {
	var proto = tf_gcmessages.CMsgGC_GameServer_ListResponse.parse(body);
	this.emit('registeredServers', proto.ownedGameServers || []);
};

handlers[Language.GameServer_ResetIdentityResponse] = function(body) {
	var proto = tf_gcmessages.CMsgGC_GameServer_ResetIdentityResponse.parse(body);
	this.emit('resetIdentity', proto.gameServerIdentityTokenReset, proto.gameServerAccountId, proto.gameServerIdentityToken);
};
