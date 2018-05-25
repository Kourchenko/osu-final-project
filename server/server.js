/**
 * server.js
 * Author: Diego Kourchenko
 *
 * Server side code using ExpressJS
 * for a web application.
 */


// Error Codes
var HTTP_CODE_OK = 200;
var HTTP_CODE_CREATED = 201;
var HTTP_CODE_NO_CONTENT = 204;
var HTTP_CODE_CLIENT_ERR = 400;
var HTTP_CODE_NOT_FOUND = 404;
var HTTP_CODE_SERVER_ERR = 500;
var users = 0;

var http = require('http');
var app = require('express')();
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');


app.use(bodyparser.json());        
app.use(bodyparser.urlencoded({ extended: true })); 






/*
			GET FUNCTIONS          
								AUTHOR: Darius			*/
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/index.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/style.css', function(req, res) {
	res.sendFile(path.join(__dirname + '/../style.css'));
});

app.get('/index.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.js'));
});

app.get('/logo_white.png', function(req, res) {
	res.sendFile(path.join(__dirname + '/../images/logo_white.png'));
});

app.get('/logo.png', function(req, res) {
	res.sendFile(path.join(__dirname + '/../images/logo.png'));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../404.html'));
});





/*
			POST FUNCTIONS         
								AUTHOR: Darius			*/
app.post('/username', function(req, res) {
	console.log('');
	console.log('=============== NEW USER ===================');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('============================================');
	console.log('');
});

app.post('/match_found', function(req, res) {
	console.log('');
	console.log('======== NEW MATCH FOUND RESPONSE ==========');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('=== RESPONSE: ' + req.body.response);
	console.log('============================================');
	console.log('');
});

app.post('/ask_chat', function(req, res) {
	console.log('');
	console.log('========== NEW ASK CHAT RESPONSE ===========');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('=== RESPONSE: ' + req.body.response);
	console.log('============================================');
	console.log('');
});






app.listen(8080, function() {
	console.log('');
	console.log('============================================');
	console.log('=== Server running at http://127.0.0.1:8080/');
	console.log('============================================');
	console.log('');
});





















/*
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('message', "You are connected");
	addUsers();
	socket.on('new_username', function(username) {
		socket.username = username;
	});
	// display number of users, should be unique users
	socket.on('message', function(message) {
		console.log("new message from: " + socket.username);
	});
});*/

//server.listen(8080);


function addUsers() {
	users+=1;
}
