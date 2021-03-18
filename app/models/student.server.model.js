const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

var StudentSchema = new Schema({
    studentNumber: Number,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: Number,
    email: {
		type: String,
        unique: true,
        required: 'Email is requerid',
        trim: true,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
    program: String,
    password: {
		type: String,
		validate: [
			(password) => password && password.length > 3,
			'Password should be longer'
		]
	},
	courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});


StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

StudentSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

StudentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};

StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('Student', StudentSchema);
