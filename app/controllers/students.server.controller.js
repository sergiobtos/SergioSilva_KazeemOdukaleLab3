const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 1200;
const jwtKey = config.secretKey;

const getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.create = function (req, res, next){
    console.log(JSON.stringify(req.body));
    var student = new Student(req.body);
    student.save(function(err){
        if(err){
            res.status(400).json('Error: '+ err);
            return next(err);
        }else{
            res.json('User Added');
        }

    });
};