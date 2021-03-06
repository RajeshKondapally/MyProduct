const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const StudentRegisterSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		lowercase: true		
	},
	lastname: {
		type: String,
		required: true,
		lowercase: true
	},
	phone: {
		type: String,
		required: true,
		unique: true,		
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},	
	password: {
		type: String,
		required: true
	}
});

StudentRegisterSchema.pre('save' , function(next) {
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

StudentRegisterSchema.methods.comparePassword = function(password) {			
	if(this.password != null) {		
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }	
}

module.exports = mongoose.model('StudentRegister', StudentRegisterSchema);