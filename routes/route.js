const express = require("express");
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const Registration = require('../models/registration');
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const url = "mongodb://localhost:27017/";


//Creating new Student
router.post('/studentregister', (req, response, next) => {
    if (!req.body.firstname) {
        response.status(400).send({
            success: false,
            message: "First name is required"
        });
    } else if (!req.body.lastname) {
        response.status(400).send({
            success: false,
            message: "Last name is required"
        });
    } else if (!req.body.phone) {
        response.status(400).send({
            success: false,
            message: "Phone number is required"
        });
    } else if (!req.body.email) {
        response.status(400).send({
            success: false,
            message: "Email is required"
        });
    } else if (!req.body.username) {
        response.status(400).send({
            success: false,
            message: "User name is required"
        });
    } else if (!req.body.password) {
        response.status(400).send({
            success: false,
            message: "Password is required"
        });
    } else {
        let newStudent = new Registration({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,  
            type: req.body.type          
        });

        /*MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("eduket");
          
          dbo.collection("students").insertOne(newStudent, function(err, res) {
            if (err) throw err;	    
            response.send(res);	    
            db.close();
          });
        });*/

        newStudent.save((err) => {
            if (err) {
                response.status(400).send({
                    success: false,
                    message: "User can not be registered"
                });
            } else {
                response.status(200).send({
                    success: true,
                    message: "User saved."
                });
            }
        });
    }
});

//Creating Teacher
router.post('/teacherregister', (req, response, next) => {
    let newTeacher = new Registration({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,        
        category: req.body.category,
        skills: req.body.skills,
        bio: req.body.bio,
        type: req.body.type
    });

    newTeacher.save((err) => {
    	console.log(err);
        if (err) {
            response.status(400).send({
                success: false,
                message: "User can not be registered"
            });
        } else {
            response.status(200).send({
                success: true,
                message: "User Registered."
            });
        }
    });
});

//student authorization 
router.post('/login', (req, response, next) => {
    if (!req.body.username) {
        response.status(400).send({
            success: false,
            message: "User name is required"
        });
    } else if (!req.body.password) {
        response.status(400).send({
            success: false,
            message: "Password is required"
        });
    } else {
        var reqObj = {
            username: req.body.username
        };
        Registration.findOne(reqObj, (err, user) => {
            if (err) {
                response.status(400).send({
                    success: false,
                    message: err
                });
            } else {
                if (!user) {
                    response.status(400).send({
                        success: false,
                        message: "Username not found"
                    });
                } else {
                    var validatePassword = user.comparePassword(req.body.password);
                    if (!validatePassword) {
                        response.status(400).send({
                            success: false,
                            message: "Password invalid"
                        });
                    } else {
                        const token = jwt.sign({
                            userId: user._id
                        }, config.secret, {
                            expiresIn: '24h'
                        });
                        response.status(200).send({
                            success: true,
                            message: "Authentication success",
                            token: token,
                            user: {
                                username: user.username
                            }
                        });
                    }
                }
            }
        })
    }
    /*MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("eduket");
      var myobj = { username: req.body.username, password: req.body.password };	  
      dbo.collection("students").find(myobj).toArray(function(err, result) {	  	
        if (err) throw err;
        if(result.length === 0) {	   
        	response.status(404).send("Authentication failed");
        } else {
        	response.send(result);	
        }	    
        db.close();
      });
    });*/
});

router.get('/getteacherspre', (req, res) => {  
    Registration.find().where('type').equals('TC')
    .select('username email skills bio').exec((err, user) => {
        if(err) {
            res.status(400).send({success: false, message: err});
        } else {
            if(!user) {
                res.status(400).send({success: false, message: "User not found"});
            } else {
                res.status(200).send({success: true, user: user});
            }
        }
    });
});

router.get('/useravailable/:username', (req, res) => {
    var username = req.params.username;
    Registration.findOne().where('username').equals(username)
    .select('username email skills bio').exec((err, user) => {
        if(err) {
            res.status(400).send({success: false, message: err});
        } else {
            if(!user) {
                res.status(400).send({success: false, message: "User not found"});
            } else {
                res.status(200).send({success: true, user: user});
            }
        }
    });
})




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