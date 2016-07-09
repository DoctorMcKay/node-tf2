var vdf = require('vdf');
var request = require('request');
var fs = require('fs');

var TeamFortress2 = require('./index.js');
var Language = require('./language.js');
var Protos = require('./protos.js');

var handlers = TeamFortress2.prototype._handlers;

// ClientWelcome, ServerWelcome, ClientGoodbye, and ServerGoodbye
handlers[Language.ClientWelcome] = function(body) {
	var proto = Protos.CMsgClientWelcome.decode(body);
	this.haveGCSession = true;
	this.emit('connectedToGC', proto.version);
};

handlers[Language.ServerWelcome] = function(body) {
	var proto = Protos.CMsgServerWelcome.decode(body);
	this.haveGCSession = true;
	this.emit('connectedToGC', proto.activeVersion);
};

handlers[Language.ClientGoodbye] = function(body) {
	var proto = Protos.CMsgClientGoodbye.decode(body);
	
	if(this.haveGCSession) {
		this._connect(); // Try to reconnect
		this.haveGCSession = false;
	}
	
	this.emit('disconnectedFromGC', proto.reason);
};

handlers[Language.ServerGoodbye] = function(body) {
	var proto = Protos.CMsgServerGoodbye.decode(body);

	if(this.haveGCSession) {
		this._connect(); // Try to reconnect
		this.haveGCSession = false;
	}

	this.emit('disconnectedFromGC', proto.reason);
};

// Item schema
handlers[Language.UpdateItemSchema] = function(body) {
	var proto = Protos.CMsgUpdateItemSchema.decode(body);
	this.emit('itemSchema', proto.itemSchemaVersion.toString(16).toUpperCase(), proto.itemsGameUrl);
	
	var self = this;
	request({
		"uri": proto.itemsGameUrl,
		"gzip": true
	}, function(err, response, body) {
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
	var proto = Protos.CMsgSystemBroadcast.decode(body);
	this.emit('systemMessage', proto.message);
};

handlers[Language.ClientDisplayNotification] = function(body) {
	if(!this.lang) {
		// We only handle this if we have a localization file
		return;
	}
	
	var proto = Protos.CMsgGCClientDisplayNotification.decode(body);
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
	var proto = Protos.CMsgGCTFSpecificItemBroadcast.decode(body);
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
	var tradeID = body.readUint32();
	var steamID = body.readUint64().toString();
	this.emit('tradeRequest', steamID, tradeID);
};

handlers[Language.Trading_InitiateTradeResponse] = function(body) {
	var response = body.readUint32();
	var tradeID = body.readUint32();
	this.emit('debug', "Got trade response " + response + " for " + tradeID);
	this.emit('tradeResponse', response, tradeID);
};

// SO
handlers[Language.SO_CacheSubscriptionCheck] = function(body) {
	this.emit('debug', "Requesting SO cache subscription refresh");
	this._send(Language.SO_CacheSubscriptionRefresh, Protos.CMsgSOCacheSubscriptionRefresh, {"owner": this._steam.steamID});
};

handlers[Language.SO_CacheSubscribed] = function(body) {
	var proto = Protos.CMsgSOCacheSubscribed.decode(body);
	var self = this;
	proto.objects.forEach(function(cache) {
		switch(cache.typeId) {
			case 1:
				// Backpack
				var items = cache.objectData.map(function(object) {
					var item = Protos.CSOEconItem.decode(object);
					var isNew = (item.inventory >>> 30) & 1;
					item.id = item.id.toString();
					item.originalId = item.originalId.toString();
					item.position = (isNew ? 0 : item.inventory & 0xFFFF);
					return item;
				});
				
				self.backpack = items;
				self.emit('backpackLoaded');
				break;
			case 7:
				// Account metadata
				var data = Protos.CSOEconGameAccountClient.decode(cache.objectData[0]);
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
	var proto = Protos.CMsgSOSingleObject.decode(body);
	if(proto.typeId != 1) {
		return; // Not an item
	}
	
	if(!this.backpack) {
		return; // We don't have our backpack yet!
	}
	
	var item = Protos.CSOEconItem.decode(proto.objectData);
	item.id = item.id.toString();
	item.originalId = item.originalId.toString();
	item.position = item.inventory & 0x0000FFFF;
	this.backpack.push(item);
	this.emit('itemAcquired', item);
};

handlers[Language.SO_Update] = function(body) {
	var proto = Protos.CMsgSOSingleObject.decode(body);
	this._handleSOUpdate(proto);
};

handlers[Language.SO_UpdateMultiple] = function(body) {
	var items = Protos.CMsgSOMultipleObjects.decode(body).objects;
	var self = this;
	
	items.forEach(function(item) {
		self._handleSOUpdate(item);
	});
};

TeamFortress2.prototype._handleSOUpdate = function(so) {
	var i;
	switch(so.typeId) {
		case 1:
			if(!this.backpack) {
				return; // We don't have our backpack yet!
			}
			
			var item = Protos.CSOEconItem.decode(so.objectData);
			item.id = item.id.toString();
			item.originalId = item.originalId.toString();
			item.position = item.inventory & 0x0000FFFF;
			for(i = 0; i < this.backpack.length; i++) {
				if(this.backpack[i].id == item.id) {
					var oldItem = this.backpack[i];
					this.backpack[i] = item;
					
					this.emit('itemChanged', oldItem, item);
					break;
				}
			}
			
			break;
		case 7:
			var data = Protos.CSOEconGameAccountClient.decode(so.objectData);
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
			for(i in oldData) {
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
};

handlers[Language.SO_Destroy] = function(body) {
	var proto = Protos.CMsgSOSingleObject.decode(body);
	if(proto.typeId != 1) {
		return; // Not an item
	}
	
	if(!this.backpack) {
		return; // We don't have our backpack yet
	}
	
	var item = Protos.CSOEconItem.decode(proto.objectData);
	item.id = item.id.toString();
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
	var blueprint = body.readInt16(); // recipe ID
	var unknown = body.readUint32(); // always 0 in my experience
	
	var idCount = body.readUint16();
	var idList = []; // let's form an array of IDs
	
	for(var i = 0; i < idCount; i++) {
		var id = body.readUint64().toString(); // grab the next id
		idList.push(id); // item id
	}
	
	this.emit('craftingComplete', blueprint, idList);
};

// Professor Speks
handlers[Language.FreeTrial_ThankedBySomeone] = function(body) {
	var proto = Protos.CMsgTFThankedBySomeone.decode(body);
	this.emit('professorSpeksReceived', proto.thankerSteamId.toString());
};

handlers[Language.FreeTrial_ThankedSomeone] = function(body) {
	this.emit('professorSpeksSent');
};

// Game Servers
handlers[Language.GameServer_CreateIdentityResponse] = function(body) {
	var proto = Protos.CMsgGC_GameServer_CreateIdentityResponse.decode(body);
	this.emit('createIdentity', proto.status, proto.accountCreated, proto.gameServerAccountId, proto.gameServerIdentityToken);
};

handlers[Language.GameServer_ListResponse] = function(body) {
	var proto = Protos.CMsgGC_GameServer_ListResponse.decode(body);
	this.emit('registeredServers', proto.ownedGameServers || []);
};

handlers[Language.GameServer_ResetIdentityResponse] = function(body) {
	var proto = Protos.CMsgGC_GameServer_ResetIdentityResponse.decode(body);
	this.emit('resetIdentity', proto.gameServerIdentityTokenReset, proto.gameServerAccountId, proto.gameServerIdentityToken);
};

// Spy vs. Engi War
handlers[Language.War_GlobalStatsResponse] = function(body) {
	var proto = Protos.CGCMsgGC_War_GlobalStatsResponse.decode(body);
	var mySides = {}; // they are in orbit
	(proto.sideScores || []).forEach(function(side) {
		mySides[side.side] = side.score.toString();
	});

	this.emit('warStats', mySides);
};