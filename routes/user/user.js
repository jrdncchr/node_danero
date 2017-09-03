var mongoose = require('mongoose');

var User = new mongoose.Schema({
	email: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	active: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

User.post('save', function(user) {
	console.log('A user with email %s has been saved.', user.email);
});

User.post('remove', function(doc) {
	console.log('%s from users has been removed.', doc.email);
});

module.exports = mongoose.model('Users', User);