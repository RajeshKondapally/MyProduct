var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();
const route = require('./routes/route');

//connect to mongo DB
mongoose.connect('mongodb://localhost:27017/eduket');

//on connection success

mongoose.connection.on('connected', ()=> {
	console.log("Connection to Mongo DB @27017 is successfull");
});

mongoose.connection.on('error', (err)=> {
	if(err) {
		console.log(`Error DB connection ${err}`);
	}	 
});

//port no
const port = process.env.PORT || 3000;
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