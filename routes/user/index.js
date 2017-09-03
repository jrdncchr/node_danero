var express = require('express');
var router = express.Router();

var User = require('./user');

/* GET listing. */
router.get('/', function(req, res) {
	User.find({ active: true }, function(err, result) {
		if (err) throw err;
		res.send(result);
	});
});

/* GET by id */
router.get('/:id', function(req, res) {
	User.findById({ _id: req.params.id, active: true }, function(err, result) {
		if (err) throw err;
		res.send(result);
	});
});

/* INSERT or UPDATE */
router.post('/', function(req, res) {
	if (req.body.id) {
		User.findByIdAndUpdate(req.body.id, {
			name: req.body.name,
			email: req.body.email,
			active: req.body.active,
			updated_at: new Date()
		}, function(err, result) {
			if (err) throw err;
			res.json({ saved: true, action: 'update'});
		});
	} else {
		var user = User({
			name: req.body.name,
			email: req.body.email,
			active: req.body.active,
			password: req.body.password
		});
		user.save(function(err, result) {
			if (err) throw err;
			res.json({ saved: true, action: 'insert'});
		});
	}
});

/* DELETE */
router.delete('/', function(req, res) {
	if (req.body.id) {
		User.findByIdAndRemove(req.body.id, function(err, result) {
			if (err) throw err;
			res.json({ success: true });
		});
	} else {
		res.json({ success: false, error: "User ID not found." });	
	}
});

module.exports = router;
