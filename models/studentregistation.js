const mongoose = require('mongoose');

const StudentRegisterSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},	
	password: {
		type: String,
		required: true
	},	
	dob: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	}
});

const StudentRegister = module.exports = mongoose.model('StudentRegister', StudentRegisterSchema);