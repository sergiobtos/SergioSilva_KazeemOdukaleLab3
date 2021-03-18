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
				message = 'Email already exists';
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
            return res.status(400).send({ message: getErrorMessage(err)});
        }else{
            res.json('Student was registered successfully!');
        }

    });
};

exports.authenticate = function(req, res, next) {
	const email = req.body.auth.email;
	const password  = req.body.auth.password;
	Student.findOne({email: email}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			if(bcrypt.compareSync(password, student.password)) {
				const token = jwt.sign({ id: student._id, email: student.email }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: student.email });
				req.student=student;
				next()
			} else {
				res.json({status:"error", message: "Invalid email/password!!!",
				data:null});
			}
			
		}
		
	});
}; 



exports.signout = (req, res) =>{
	res.clearCookie("token");
	return res.status('200').json({message: "Signed Out"});
};

exports.welcome = (req, res) => {
	const token = req.cookies.token;
	console.log("Welcome controller: "+token);
	if(!token){
		return res.status(401).end();
	}
	var payload;
	try{
		payload = jwt.verify(token, jwtKey);
	}catch (e){
		if ( e instanceof jwt.JsonWebTokenError){
			return res.status(401).end();
		}
	return res.status(400).end();
	}

	res.send(`${payload.email}`);
};

exports.list = function (req, res, next) {
    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

exports.isSignedIn = (req, res) =>{
	const token = req.cookies.token;
	if(!token){
		return res.send({screen: 'auth'}).end();
	}
	var payload;
	try{
		payload = jwt.verify(token, jwtKey);
	}catch (e){
		if (e instanceof jwt.JsonWebTokenError){
			return res.status(401).end();
		}
		return res.status(400).end();
	}
	res.status(200).send({screen: payload.email});
};

exports.requiresLogin = function (req, res, next) {
	console.log(req.cookies);
	const token = req.cookies.token
	//console.log(token)
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  payload = jwt.verify(token, jwtKey)
	  //console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		return res.status(401).end()
	  }
	  return res.status(400).end()
	}
    next();
};