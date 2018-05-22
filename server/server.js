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

var app = require('express')();
var fs = require('fs');
var syncIndex = fs.readFileSync(__dirname+"/../index.html", "utf-8");
var syncCSS = fs.readFileSync(__dirname+"/../style.css");

var server = http.createServer(function(req, res) {
	if (req.url === "/index.html") {
		res.end(syncIndex);
	} else if (req.url == "/style.css") {
		res.end(syncCSS)
	}
});
