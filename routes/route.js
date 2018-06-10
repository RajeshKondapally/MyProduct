const express = require("express");
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const StudentRegister = require('../models/studentregistation');
const TeacherRegister = require('../models/teacherregistation');

const url = "mongodb://localhost:27017/";

router.get( '/students', (req, response, next) => {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("eduket");
	  dbo.collection("students").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    response.json(result);
	    db.close();
	  });
	});
});

//Creating new Student
router.post('/studentregister', (req, response, next) => {	
	let newStudent = new StudentRegister({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phone: req.body.phone,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		dob: req.body.dob,
		gender: req.body.gender
	});

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("eduket");
	  
	  dbo.collection("students").insertOne(newStudent, function(err, res) {
	    if (err) throw err;
	    console.log(res);
	    response.json(res);	    
	    db.close();
	  });
	});
});

//student authorization 
router.post('/slogin', (req, response , next) => {
	console.log(req.body.username);

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("eduket");
	  var myobj = { username: req.body.username, password: req.body.password };
	  console.log(myobj);
	  dbo.collection("students").find(myobj).toArray(function(err, result) {
	    if (err) throw err;
	    response.json(result);
	    db.close();
	  });
	});
});

//Creating Teacher
router.post('/studentregister', (req, res, next) => {
	let newStudent = new StudentRegister({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phone: req.body.phone,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		dob: req.body.dob,
		gender: req.body.gender,
		category: req.body.category,
		skills: req.body.skills,
		bio: req.body.bio
	});

	newTeacher.save((err, teacher)=> {
		if(err) {
			res.json({msg: `Failed to store teacher`});
		} else {
			res.json({msg: `Contact saved successfully ${JSON.stringify(teacher)}`});
		}
	});
});

/*//deleting contact
router.delete('/contact/:id', (req, res, next) => {
	Contact.remove({_id: req.params.id}, function(err, result) {
		if(err) {
			res.json({msg: "The id you are trying to delete is not found."});
		} else {
			res.json({msg: "Your contact was deleted successfully"});
			//res.json(result);
		}
	});
});

//Update contact
router.put('/contact/:id', (req, res, next) => {
	console.log(req.params.id);
	console.log(req.body);
	let newContact = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	};
	Contact.update({_id: req.params.id}, newContact, function(err, result) {
		if(err) {
			console.log(err);
			res.json({msg: "The id you are trying to delete is not found."});
		} else {
			console.log("Success Update");
			res.json({msg: "Your contact was updated successfully"});
			//res.json(result);
		}
	});
});
//Adding data
router.post('/user', (req, res, next) => {
	let newUser = new User({
		first_name: req.body.fn,
		last_name: req.body.ln,
		phone: req.body.ph,
		password: req.body.pass
	});

	newUser.save((err, user)=> {
		if(err) {
			res.json({msg: `Failed to store contact`});
		} else {
			res.json({msg: `Contact saved successfully ${JSON.stringify(user)}`});
		}
	});
});*/
module.exports = router;