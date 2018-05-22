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
var syncIndex = fs.readFileSync(__dirname+"/../index.html", "utf-8");
var syncCSS = fs.readFileSync(__dirname+"/../style.css", "utf-8");
var syncIndexJS = fs.readFileSync(__dirname+"/../index.js", "utf-8");

var server = http.createServer(function(req, res) {
	if (req.url === "/index.html") {
		res.end(syncIndex);
	} else if (req.url == "/style.css") {
		res.end(syncCSS);
	} else if (req.url == "/index.js") {
		res.end(syncIndexJS)
	} else {
		// send content of file -- '/socket.io/socket.io.js'
		fs.readFile("/../index.html", "utf-8", function(err, content) {
			res.end(content);
		});
	}
});

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
});

server.listen(8080);


function addUsers() {
	users+=1;
}
