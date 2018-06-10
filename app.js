var express = require("express");
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const url = "mongodb://localhost:27017/eduket";
var app = express();
const route = require('./routes/route');

//connect to mongo DB
mongoose.connect(url);

//on connection success

mongoose.connection.on('connected', ()=> {
	console.log("Connection to Mongo DB @27017 is successfull");
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("eduket");
  dbo.createCollection("students", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

mongoose.connection.on('error', (err)=> {
	if(err) {
		console.log(`Error DB connection ${err}`);
	}	 
});

//port no
const port = process.env.PORT || 4000;
//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

app.get('/', (req, res)=> {

	res.send("Hmmmm...!!!!! Working"); 	
})

app.listen(port, () => {
	console.log(`Server started at port no:${ port }. Good luck`);
})