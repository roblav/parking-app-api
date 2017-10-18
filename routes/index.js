/**
 * Module Dependencies
 */
const errors = require('restify-errors');
const mongoose = require('mongoose');
const request = require('request');

/**
 * Model Schema
 */
const CarOwner = require('../models/CarOwner');
const SkypeUser = require('../models/SkypeUser');

module.exports = function(server) {

	const db = mongoose.connection;
	//console.log(db)
	// API: GET /car-owners
	server.get('/car-owners', (req, res, next) => {
		CarOwner.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}
	
			res.send(docs);
			next();
		});
	});

				// API: POST /car-owners
	server.post('/car-owners/skype-display-name', (req, res, next) => {

		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = JSON.parse(req.body) || {};

		console.log(data.name);

		// get all the users
		SkypeUser.find({'user.name': data.name}, function(err, user) {
  		if (err) throw err;
  		// get converstaion.id / user.id
			var skypeId = user[0].user.id;
			var skypeDisplayName = user[0].user.name;
  		console.log(skypeId, skypeDisplayName);
			//POST to Skype Alert
			var postData = {
  			skypeId: skypeId,
				skypeDisplayName: skypeDisplayName
			}

			request.post({
				url: 'https://myparking-bot.azurewebsites.net/skype-alert',
				//url: 'http://localhost:3978/skype-alert',
				body: postData,
  			json: true,
				function(err, res, body){
  				if (err) { return console.log(err); }
  				console.log(body);
				}
			});

			res.send(201);
			next();
			
		});

		//console.log(skypeUser);

		//----Make a call to the Skype Bot
		// Make a DB query using SkypeDisplayName and get the conversation id.

	});

	// API: POST /car-owners
	server.post('/car-owners', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};

		console.log(data)

		let carOwner = new CarOwner(data);
		carOwner.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
			}

			res.send(201);
			next();
		});
	});

	// API: GET /car-owners/:id
	server.get('/car-owners/:carOwner_id', (req, res, next) => {
		CarOwner.findOne({ _id: req.params.carOwner_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(doc);
			next();
		});
	});

	// API: PUT /car-owners/:id
	server.put('/car-owners/:carOwner_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.todo_id });
		}

		CarOwner.findOne({ _id: req.params.carOwner_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.'
					)
				);
			}

			CarOwner.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

	// API: DELETE /car-owners/:id
	server.del('/car-owners/:carOwner_id', (req, res, next) => {
		CarOwner.remove({ _id: req.params.carOwner_id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(204);
			next();
		});
	});
};
