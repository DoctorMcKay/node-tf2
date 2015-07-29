var ByteBuffer = require('bytebuffer');
var Protos = require('../protos.js');

module.exports = CEconItemAttribute;

function CEconItemAttribute(defindex, value, tf2) {
	var details = tf2.itemSchema.attributes[defindex];

	this.defindex = defindex;
	this.value = null;
	this.details = details;

	if(typeof details.stored_as_integer !== 'undefined') {
		// It's a standard type attribute.
		if(ByteBuffer.isByteBuffer(value)) {
			if(details.stored_as_integer) {
				this.value = value.readUint32();
			} else {
				this.value = value.readFloat32();
			}
		} else {
			this.value = details.stored_as_integer ? parseInt(value, 10) : parseFloat(value);
		}
	} else if(details.attribute_type && ByteBuffer.isByteBuffer(value)) {
		// Parse it from a protobuf
		switch(details.attribute_type) {
			case 'string':
				this.value = Protos.CAttribute_String.decode(value).value;
				break;

			case 'item_slot_criteria':
				this.value = Protos.CAttribute_ItemSlotCriteria.decode(value).tags;
				break;

			case 'uint64':
				this.value = value.readUint64();
				break;

			case 'dynamic_recipe_component_defined_item':
				this.value = Protos.CAttribute_DynamicRecipeComponent.decode(value);
				break;

			default:
				this.value = value;
		}
	} else {
		this.value = value;
	}

	// Check if we should remap the value to anything
	switch(this.details.description_format) {
		case 'value_is_date':
			this.value = new Date(this.value * 1000);
			break;
	}

	if(tf2.lang && this.details.description_string && tf2.lang[this.details.description_string.substring(1)]) {
		this.details.description_string = tf2.lang[this.details.description_string.substring(1)];
	}

	// Turn number-boolean strings into bools
	var self = this;
	['hidden', 'stored_as_integer'].forEach(function(thing) {
		if(typeof self.details[thing] === 'string') {
			self.details[thing] = self.details[thing] == '1';
		}
	});
}
