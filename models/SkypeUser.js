const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const SkypeUserSchema = new mongoose.Schema(
	{
		id: { type: String, required: true, trim: true },
		channelId: { type: String, required: true, trim: true },
		user: {
			id: { type: String, required: true, trim: true },
			name: { type: String, required: true, trim: true }
		},
		conversation: {
			id: { type: String, required: true, trim: true }
		},
		bot: {
			id: { type: String, required: true, trim: true },
			name: { type: String, required: true, trim: true }
		},
		serviceUrl: { type: String, required: true, trim: true }
	},
	{ minimize: false },
	{ collection: 'skypeusers' }
);

SkypeUserSchema.plugin(timestamps);
SkypeUserSchema.plugin(mongooseStringQuery);

const SkypeUser = mongoose.model('SkypeUser', SkypeUserSchema);
module.exports = SkypeUser;
