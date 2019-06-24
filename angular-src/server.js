var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var db;
var cors = require('cors');

app.use(cors());
app.listen(3001);

app.get('/category', function (req, res) {

  //  console.log('title is ',req.query.title)
  var jobTitle = req.query.title;

  //Establish Connection
  //MongoClient.connect('mongodb://localhost:27017', function (err, database) {
    MongoClient.connect('mongodb+srv://tootavDBuser1:YgI7igGX0xrHxq6g@tootavmdb1-enu7g.gcp.mongodb.net/test?retryWrites=true&w=majority', function (err, database) {
    if (err)
      throw err
    else {
      //db = database;
      db = database.db('Indeed');

      console.log('Connected to MongoDB');
      console.log(jobTitle);

      db.collection("Indeed_Jobs").find({
        $or: [{
          title: {
            $regex: ".*" + jobTitle + ".*",
            $options: 'i'
          }
        }, {
          description: {
            $regex: ".*" + jobTitle + ".*",
            $options: 'i'
          }
        }]
      }).toArray(function (err, result) {

        if (err) throw err;

        //console.log(result);
        res.send(result)
        database.close();
      });
    }
  });
})


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

app.get('/searchJon', function (req, res) {

  var jobLocation = req.query.state;
  var jobTitle = req.query.title;

  console.log(jobLocation)
  console.log(jobTitle)

  //Establish Connection
  MongoClient.connect('mongodb+srv://tootavDBuser1:YgI7igGX0xrHxq6g@tootavmdb1-enu7g.gcp.mongodb.net/test?retryWrites=true&w=majority', function (err, database) {
    if (err)
      throw err
    else {
      db = database.db('Indeed');

      console.log('Connected to MongoDB');
      db.collection("Indeed_Jobs") //
        .find({
          $and: [{
              $or: [{
                  title: {
                    $regex: ".*" + jobTitle + ".*",
                    $options: 'i'
                  }
                },
                {
                  description: {
                    $regex: ".*" + jobTitle + ".*",
                    $options: 'i'
                  }
                }
              ]
            },
            {
              state: {
                $regex: ".*" + jobLocation + ".*",
                $options: 'i'
              }
            }
          ]
        })
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result)
          database.close();
        });
    }
  });
})
