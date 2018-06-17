const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const RegisterSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		lowercase: true,
		unique: true		
	},	
	password: {
		type: String,
		required: true
	},
	skills: {
		type: String,
		reuired: true
	},
	bio: {
		type: String,
		required: false
	}
});

RegisterSchema.pre('save' , function(next) {
	if(!this.isModified('password')){
		return next();
	}

	bcrypt.hash(this.password, null, null, (err, hash) => {
		if(err) {
			return next(err);
		}
		this.password = hash;
		next();
	});
});

RegisterSchema.methods.comparePassword = function(password) {			
	if(this.password != null) {		
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }	
}

const Registration = module.exports = mongoose.model('Registration', RegisterSchema);