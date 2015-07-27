var TeamFortress2 = require('../index.js');
var CEconItemAttribute = require('./CEconItemAttribute.js');

var g_AttributeNameCache = {};

module.exports = CEconItem;

function CEconItem(soItem, tf2) {
	this._tf2 = tf2;

	this._inventory = soItem.inventory;

	this.id = soItem.id.toString();
	this.defindex = soItem.defIndex;
	this.quantity = soItem.quantity;
	this.level = soItem.level;
	this.quality = soItem.quality;
	this.flags = soItem.flags;
	this.origin = soItem.origin;
	this.customName = soItem.customName;
	this.customDescription = soItem.customDesc;
	this.containedItem = soItem.interiorItem ? new CEconItem(soItem.interiorItem, tf2) : null;
	this.inUse = soItem.inUse;
	this.style = soItem.style;
	// Maybe equipped state at some point

	var attributes = {};
	(soItem.attribute || []).forEach(function(attribute) {
		attributes[attribute.defIndex] = new CEconItemAttribute(attribute.defIndex, attribute.valueBytes, tf2);
	});

	this.attributes = attributes;
}

CEconItem.prototype.getDetails = function() {
	if(this._details) {
		return this._details;
	}

	if(!this._tf2.itemSchema || !this._tf2.itemSchema.items || !this._tf2.itemSchema.items[this.defindex]) {
		return null;
	}

	var item = this._tf2.itemSchema.items[this.defindex];

	// Apply any prefabs
	if(item.prefab && this._tf2.itemSchema.prefabs) {
		var self = this;
		item.prefab.split(' ').forEach(function(prefab) {
			self._applyPrefab(item, prefab);
		});
	}

	// Convert array-like objects into arrays
	['capabilities', 'tags', 'used_by_classes'].forEach(function(name) {
		if(item[name]) {
			item[name] = Object.keys(item[name]);
		}
	});

	// Get names from localization file if we have one
	var lang = this._tf2.lang;
	if(lang) {
		['item_name', 'item_type_name', 'item_description'].forEach(function(name) {
			if(item[name] && lang[item[name].substring(1)]) {
				item[name] = lang[item[name].substring(1)];
			}
		});
	}

	if(item.attributes) {
		var defindex;
		var attributes = {};
		for(var name in item.attributes) {
			if(!item.attributes.hasOwnProperty(name) || !(defindex = getAttributeDefindexByName(this._tf2.itemSchema, name)) || !this._tf2.itemSchema.attributes[defindex]) {
				continue;
			}

			attributes[defindex] = new CEconItemAttribute(defindex, item.attributes[name].value, this._tf2);
		}

		item.attributes = attributes;
	} else {
		item.attributes = {};
	}

	this._details = item;
	return item;
};

CEconItem.prototype._applyPrefab = function(item, prefabName) {
	var prefab = this._tf2.itemSchema.prefabs[prefabName];
	if(!prefab) {
		return;
	}

	for(var i in prefab) {
		if(!prefab.hasOwnProperty(i) || i == 'prefab' || i == 'public_prefab') {
			continue;
		}

		item[i] = prefab[i];
	}

	var self = this;
	if(prefab.prefab) {
		prefab.prefab.split(' ').forEach(function(nestedPrefab) {
			self._applyPrefab(item, nestedPrefab);
		});
	}
};

CEconItem.prototype.getBackpackPosition = function() {
	return (this._inventory >>> 30) & 1 ? 0 : this._inventory & 0x0000FFFF;
};

CEconItem.prototype.getAttribute = function(attribute) {
	if(!this._tf2.itemSchema) {
		return null;
	}

	if(typeof attribute === 'string' && isNaN(parseInt(attribute, 10))) {
		if((attribute = getAttributeDefindexByName(this._tf2.itemSchema, attribute)) === null) {
			return null;
		}
	}

	if(this.attributes[attribute]) {
		return this.attributes[attribute];
	}

	var details = this.getDetails();
	if(details.attributes[attribute]) {
		return details.attributes[attribute];
	}

	return null;
};

CEconItem.prototype.getAttributeValue = function(attribute) {
	var attrib = this.getAttribute(attribute);
	if(!attrib) {
		return null;
	}

	return attrib.value;
};

CEconItem.prototype.isTradable = function() {
	if(this.flags & TeamFortress2.ItemFlags.CannotTrade || this.flags & TeamFortress2.ItemFlags.NotEcon || this.flags & TeamFortress2.ItemFlags.Preview) {
		return false;
	}

	if(this.getAttributeValue('cannot trade')) {
		return false;
	}

	var tradableAfter = this.getAttributeValue('tradable after date');
	if(tradableAfter && tradableAfter.getTime() > Date.now()) {
		return false;
	}

	if(this.origin == TeamFortress2.ItemOrigin.Achievement) {
		return false;
	}

	return true;
};

function getAttributeDefindexByName(schema, name) {
	if(name in g_AttributeNameCache) {
		return g_AttributeNameCache[name];
	}

	for(var i in schema.attributes) {
		if(!schema.attributes.hasOwnProperty(i)) {
			continue;
		}

		if(schema.attributes[i].name == name) {
			g_AttributeNameCache[name] = i;
			return i;
		}
	}

	g_AttributeNameCache[name] = null;
	return null;
}
