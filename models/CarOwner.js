const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const CarOwnerSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		carReg: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		skypeId: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ minimize: false }
);

CarOwnerSchema.plugin(timestamps);
CarOwnerSchema.plugin(mongooseStringQuery);

const CarOwner = mongoose.model('CarOwner', CarOwnerSchema);
module.exports = CarOwner;
