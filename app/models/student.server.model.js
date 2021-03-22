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
		allowNull: false,
		comment: "null",
		validate: [
			(password) => password && password.length > 1,
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

/*StudentSchema.pre('save', function(next){
	bcrypt.hashSync(this.password, saltRounds, (err, hash) =>{
		this.password = hash;
		console.log(this.password);
	});	
	next();
});*/

StudentSchema.methods.authenticate = function(password) {
	return this.password === bcrypt.hashSync(password, saltRounds);
};

StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('Student', StudentSchema);
