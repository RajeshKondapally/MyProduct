const mongoose = require('mongoose');

const TeacherRegisterSchema = mongoose.Schema({
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
	skills: {
		type: Array,
		reuired: true
	},
	bio: {
		type: String,
		required: false
	}
});

const TeacherRegister = module.exports = mongoose.model('TeacherRegister', TeacherRegisterSchema);