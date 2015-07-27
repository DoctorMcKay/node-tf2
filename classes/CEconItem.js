module.exports = CEconItem;

function CEconItem(soItem, tf2) {
	this._tf2 = tf2;

	this._inventory = soItem.inventory;
	this._soAttributes = soItem.attribute;

	this.id = soItem.id;
	this.defindex = soItem.defIndex;
	this.quantity = soItem.quantity;
	this.level = soItem.level;
	this.quality = soItem.quality;
	this.flags = soItem.flags;
	this.origin = soItem.origin;
	this.customName = soItem.customName;
	this.customDescription = soItem.customDescription;
	this.containedItem = soItem.interiorItem ? new CEconItem(soItem.interiorItem, tf2) : null;
	this.inUse = soItem.inUse;
	this.style = soItem.style;
	// Maybe equipped state at some point
}