'use strict';

var express = require('express');
var mongo = require('mongodb');
//var routes = require('./client/routes/index.js');
var routes = require('./server/routes/index.js'); 
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose'); 
var cookieParser = require('cookie-parser'); 
var passport = require('passport'); 
var session = require('express-session'); 

require('./config/passport.js')(passport); // pass passport for configuration


var app = express();

mongoose.connect('mongodb://localhost:27017/polls', function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }
   
   app.use(bodyParser.json()); // for parsing application/json
   
   app.use(session({secret: 'whatisgoingonwithmysession?', saveUninitialized: true, resave: true})); 
   app.use(passport.initialize());
   app.use(passport.session());   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/client/controllers'));
   app.use('/directives', express.static(process.cwd() + '/client/directives'));
   app.use('/views', express.static(process.cwd()+'/client/views')); 
   app.use('/services', express.static(process.cwd()+'/client/services')); 
   
   routes(app, passport);

   app.listen(8080, function () {
      console.log('Node.js listening on port 8080...');
   });

});