const express = require("express");
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const Registration = require('../models/registration');
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const url = "mongodb://localhost:27017/";

router.use((req, res, next) => {		
    if(req.baseUrl !== '/api') {
        const token = req.headers['authorization']; 
        if(!token) {
            res.status(400).send({success: false, message: "No token provided"});
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err) {
                    res.status(400).send({success: false, message: "Token Invalid"});
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
    } else {
    	console.log("post login");
        next();
    }
	
});

router.get('/profile', (req, res) => {	
	Registration.findOne({_id: req.decoded.userId}).select('username email').exec((err, user) => {
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

router.get('/getteachers', (req, res) => {  
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

module.exports = router;