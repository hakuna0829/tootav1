// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient
var db;
//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("Invalid page");
})

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
app.listen(3001);
app.get('/state', function (req, res) {

	var jobLocation = req.query.state;
  
	//Establish Connection
	MongoClient.connect('mongodb+srv://tootavDBuser1:YgI7igGX0xrHxq6g@tootavmdb1-enu7g.gcp.mongodb.net/test?retryWrites=true&w=majority', function (err, database) {
	  if (err)
		throw err
	  else {
		db = database.db('Indeed');
		db.collection("Indeed_Jobs").createIndex( { state: "text" } )
		console.log('Connected to MongoDB');
		db.collection("Indeed_Jobs").find(
		  {
		  // state: {
		  //   $regex: ".*" + jobLocation + ".*",
		  //   $options: 'i'
		  // }
		  //$text:{$search : jobLocation}
		  state: jobLocation
		  }
		).limit( 20 ).toArray(function (err, result) {
		  if (err) throw err;
		  //console.log(result);
		  res.send(result)
		  database.close();
		});
	  }
	});
  })