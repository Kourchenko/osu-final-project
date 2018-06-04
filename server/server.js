/**
 * server.js
 * Author: Diego Kourchenko
 *
 * Server side code using ExpressJS
 * for a web application.
 */


// Error Codes
const HTTP_CODE_OK = 200;
const HTTP_CODE_CREATED = 201;
const HTTP_CODE_NO_CONTENT = 204;
const HTTP_CODE_CLIENT_ERR = 400;
const HTTP_CODE_NOT_FOUND = 404;
const HTTP_CODE_SERVER_ERR = 500;
const MAX_USERS = 2;
// connected users <= MAX_USERS
var usersInSession;
const mongoose = require('mongoose');
var http = require('http');
var app = require('express')();
var fs = require('fs');
var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
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


// Listen in on local server
// should be web server
app.listen(8080, function() {
	console.log('');
	console.log('============================================');
	console.log('=== Server running at http://127.0.0.1:8080/');
	console.log('============================================');
	console.log('');
});


/***************************************************
socket.io
websocket connections to between server and client.
***************************************************/

// socket.io connects to server
var io = require('socket.io').listen(server);

/**
 * Create new socket.io session.
 * Listen for connection
 */
io.on('connection', function(socket) {
	var addedUser = false;

	// CLIENT emits 'message';
	// - send username and message dat
	socket.on('message', function(data) {
		socket.broadcast.emit('message', {
			username: socket.username,
			message: data;
		});
	};

	// CLIENT ADD USER to session
	// - connects new user, increments numUsersInSession
	// -- NOTE: only two users in one session
	socket.on('add user', function(username) {
		if (addUser) return;

		// we store the username in the socket session for this client
		socket.username = username;
		++numUsersInSession;
		addedUser = true;

		// NOTIFY other user that another user joined
		// TODO: STOP THE LOADING WHEEL
		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsersInSession: numUsersInSession,
		});
	});

	// CLIENT IS TYPING
	socker.on('typing', function() {
		// NOTIFY other user
		socket.broadcast.emit('typing', {
			username: socket.username;
		});
	});

	// CLIENT STOPS TYPING
	socket.on('stop typing', function() {
		socket.broadcast.emit('stop typing', function() {
			username: socket.username;
		});
	});

	// USER DISCONNECT FROM session
	// NOTE: start search again,
	// NOTE: -- using loading wheel to display progress
	socket.on('disconnect', function() {
		if (addUser) {
			--numUsersInSession;
		}
		// broadcast that this client has left
		socket.broadcast.emit('user left', function() {
			username: socket.username,
			numUsersInSession: numUsersInSession
		});
	});

});

//server.listen(8080);

/**
 * addUsers
 * Two users interacting in one 'session'.
 */
function addUser(user) {
	usersInSession+=1;
}

/**
 * Get the username,
 * sanitize/security check.
 */
function getUserName() {
	var input = document.getElementById("main-username-input").value;
	var user;
	// Check empty input
	if (input) {
  	user = username.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '')
		console.log("Registering USER:", user);
		return user;
	} else {
		console.log('User Err: Empty input');
		// throw err;
	}
}

/**
 * createSession
 * creates a new session for the username.
 * socket.on('connect') will connect two users with sessions.
 */
function createSession() {
	var user = getUserName();
	console.log("Creating session for USER:", user);
	io.sockets.on('connection', function(socket) {
		socket.emit('message', "You are connected");
		addUser(user);
		socket.on('new_user', function(user) {
			socket.username = username;
		});
		// display number of users, should be unique users
		socket.on('message', function(message) {
			console.log("new message from: " + socket.username);
		});
	});
}
