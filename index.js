var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


var app = express();

//connect to MongoDB
// mongoose.connect("mongodb://localhost/QuickaPedia");
mongoose.connect("mongodb+srv://smmry:lindalinda@cluster0-feokf.gcp.mongodb.net/QuickaPedia?retryWrites=true&w=majority");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());


app.use(express.static('public'));
 
// //make way for some custom css, js and images
// app.use('/css', express.static(__dirname + '/public/css'));
// app.use('/js', express.static(__dirname + '/public/js'));

app.listen(3000, () =>
  console.log('Listening on port 3000!'),
);

//Initialize routes
app.use('/', require('./routes/api.js'));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

//Error Handling MiddleWare
app.use(function(err, req, res, next){
  // console.error(err);
  console.log(req.data);
  res.status(422).send({error: err.message});
});

// var DEF_BALANCE = 1000
// const express = require('express');
// const app = express();
// const nodemailer = require('nodemailer')
// const bodyParser = require('body-parser')
// const hasher = require('./hash')
// app.use(express.static('public'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
// app.listen(8080, () => {
//   console.log('listening on 8080');
// });

// //Serves homepage (also fits under GET requests)
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
