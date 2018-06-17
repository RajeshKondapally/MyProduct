var express = require("express");
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const config = require("./config/database");
const url = "mongodb://localhost:27017/eduket";
var app = express();
const route = require('./routes/route');
const post = require("./routes/post");
//connect to mongo DB
mongoose.connect(url);

//on connection success
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
  if(err) {
    console.log(`Error DB connection ${err}`);
  } else {
    console.log("Connection to Mongo DB @27017 is successfull");  
  }	
});

MongoClient.connect(config.uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("eduket");
  dbo.createCollection("students", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

//port no
const port = process.env.PORT || 4000;
//adding middleware - cors
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);
app.use('/post', post);

app.get('/', (req, res)=> {

	res.send("Hmmmm...!!!!! Working"); 	
})

app.listen(port, () => {
	console.log(`Server started at port no:${ port }. Good luck`);
})