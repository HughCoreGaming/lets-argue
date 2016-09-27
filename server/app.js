#!/usr/bin/env node
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');
var app = express();
var routes = require('./routes/index');

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("AIzaSyAIUBUGsKIF2RtaihtxELF22qP1IJGFbWw");
var adminToken = tokenGenerator.createToken({uid:"tvY7qPIVhNSAlDwBRfpc2qPXhE23",admin: true});

var obj = {adminToken: adminToken};

// Set static files
app.use(express.static('app'));
app.use(express.static('.tmp'));
app.use('/bower_components', express.static(path.dirname(__dirname) + '/bower_components'));

app.use(bodyParser.json());

//secret admin cookie
app.use(cookieParser(obj.adminToken, { httpOnly: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ 
    name: 'sessionID', 
    secret: obj.adminToken, 
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    },
    rolling: true, 
    resave: false, 
    saveUninitialized: true 
}));
app.use(csrf());
app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

// Set routes
app.use('/', routes);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + server.address().port);
});
