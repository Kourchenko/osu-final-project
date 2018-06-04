<<<<<<< HEAD
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
=======
>>>>>>> 712ff87f526fdd4021746b98158a638a006500ae
var http = require('http');
var app = require('express')();
var fs = require('fs');
var express = require('express');
var path = require('path');
<<<<<<< HEAD
var port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
=======
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var uniqueKey = function () {
  return '_' + Math.random().toString(36).substr(2, 12);
};

/*
			START DB          
								AUTHOR: Darius/Aaron			*/
mongoose.connect('mongodb://localhost/users', function (err) {
	if (err) {
		
		throw err;
	}
	else {
		console.log('');
		console.log('============================================');
		console.log('=== Mongoose Connected');
		console.log('============================================');
		console.log('');
	}
});

MongoClient.connect('mongodb://127.0.0.1:27017/', function (err, client) {
	if (err) {
		
		throw err;
	}
	else {
		console.log('');
		console.log('============================================');
		console.log('=== MongoDB Connected');
		console.log('============================================');
		console.log('');
		
		var db = client.db('users');
		
	}
	
	client.close();
});

var userSchema = mongoose.Schema({ 
	username: String,
	ID: String,
	isReady: String,
	pic1: String,
	pic2: String,
	match_found: String,
	ask_chat: String,
	hasPartner: String,
	partnerID: String,
	matchID: ""
	
});

var User = mongoose.model('User', userSchema);


app.use(bodyparser.json());        
app.use(bodyparser.urlencoded({ extended: true })); 





>>>>>>> 712ff87f526fdd4021746b98158a638a006500ae

/*
			GET FUNCTIONS
								AUTHOR: Darius			*/
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/index.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/terms.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/../terms.html'));
});

app.get('/contact.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/../contact.html'));
});

app.get('/about.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/../about.html'));
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
<<<<<<< HEAD
=======



/*
			CHECK/UNMATCH USER FUNCTIONS         
								AUTHOR: Darius			*/
function unMatchUsers(user1, user2) {
	User.findOneAndUpdate({ID: user1}, {match_found: "", hasPartner: "NO", partnerID: ""}).then(item => {
				console.log('');
				console.log('============================================');
				console.log('=== Resetting user: ' + user1);
				console.log('============================================');
				console.log('');
	}).catch(err => {
				console.log('');
				console.log('============================================');
				console.log('=== Error while resetting user: ' + user1);
				console.log('============================================');
				console.log('');
	});
	User.findOneAndUpdate({ID: user2}, {match_found: "", hasPartner: "NO", partnerID: "", matchID: ""}).then(item => {
				console.log('');
				console.log('============================================');
				console.log('=== Resetting user: ' + user2);
				console.log('============================================');
				console.log('');
	}).catch(err => {
				console.log('');
				console.log('============================================');
				console.log('=== Error while resetting user: ' + user2);
				console.log('============================================');
				console.log('');
	});;
}

async function checkMatch(user1, user2) {
	var user1_a = await User.find({ID: user1}).limit(1).lean().exec();
	var user2_a = await User.find({ID: user2}).limit(1).lean().exec();
	
	if ((user1_a.length == 1) && (user2_a.length == 1)) {
		if (user1_a[0].matchID == user2_a[0].matchID) {
			user1_id_x = user1_a[0].ID;
			user1_id_y = user1_a[0].partnerID;
			user2_id_x = user2_a[0].ID;
			user2_id_y = user2_a[0].partnerID;
		
			if ((user1_id_x == user2_id_y) && (user2_id_x == user1_id_y)) {
				return true;
			}
		}
		
	}
	else {
			return false;
	}
}

>>>>>>> 712ff87f526fdd4021746b98158a638a006500ae
/*
			POST FUNCTIONS
								AUTHOR: Darius			*/
app.post('/api/username', function(req, res) {
	console.log('');
	console.log('=============== NEW USER ===================');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('============================================');
	
	var newUser = new User({
		username: req.body.username,
		ID: req.body.ID,
		isReady: "NO",
		pic1: "",
		pic2: "",
		match_found: "",
		ask_chat: "",
		hasPartner: "NO",
		partnerID: ""
	});

	newUser.save().then(item => {
		console.log('=== User has been added to DB...');
		console.log('============================================');
		console.log('');
	})
	.catch(err => {
		console.log('=== Error while adding user to DB...');
		console.log('============================================');
		console.log('');
	});
	res.end();
});

app.post('/api/get_match_found', async function(req, res) {
	var thisUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();
	var otherID = thisUser[0].partnerID;
	var otherUser = await User.find({ID: otherID}).limit(1).lean().exec();
			
	if (checkMatch(req.body.ID, otherID) && (otherUser.length == 1)) {
		
		var otherUser_response = otherUser[0].match_found;
		
				if ((otherUser_response == 'YES') && (thisUser[0].match_found == 'YES')) {
					res.sendStatus(200).end();
				}
				else {
					res.sendStatus(204).end();
				}
	}
	else {
		res.sendStatus(202).end();
	}
	
});

app.post('/api/post_match_found', async function(req, res) {
	console.log('');
	console.log('======== NEW MATCH FOUND RESPONSE ==========');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('=== RESPONSE: ' + req.body.response);
	console.log('============================================');
	
	User.findOneAndUpdate({ID: req.body.ID}, {match_found: req.body.response}).then(item => {
		console.log('=== Match found response updated to: ' + req.body.response);
		console.log('============================================');
		console.log('');
	})
	.catch(err => {
		console.log('=== Error while updating match found response...');
		console.log('============================================');
		console.log('');
	});
	
	if (req.body.response == 'NO') {
		var thisUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();
		var otherID = thisUser[0].partnerID;
		
		await User.findOneAndUpdate({ID: req.body.ID}, {isReady: 'YES'}); 
		
		if (checkMatch(req.body.ID, otherID)) {
			unMatchUsers(req.body.ID, otherID);
		}
	}
	
	
	res.end();
	
	
});

app.post('/api/set_ready', function(req, res) {
	
	User.findOneAndUpdate({ID: req.body.ID}, {isReady: "YES"}).then(item => {
		console.log('');
		console.log('============================================');
		console.log('=== isReady of ' + req.body.username + ' updated to: YES...');
		console.log('============================================');
		console.log('');
	})
	.catch(err => {
		console.log('');
		console.log('============================================');
		console.log('=== Error while updating isReady...');
		console.log('============================================');
		console.log('');
	});
	res.end();
});

app.post('/api/get_ask_chat', async function(req, res) {
	var thisUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();
	var otherID = thisUser[0].partnerID;
	var otherUser = await User.find({ID: otherID}).limit(1).lean().exec();
	
	if (checkMatch(req.body.ID, otherID) && (otherUser.length == 1)) {
		
		var otherUser_response = otherUser[0].ask_chat;
		
				if ((otherUser_response == 'YES') && (thisUser[0].ask_chat == 'YES')) {
					res.sendStatus(200).end();
				}
				else {
					res.sendStatus(204).end();
				}
	}
	else {
		res.sendStatus(202).end();
	}
	
});

app.post('/api/post_ask_chat', async function(req, res) {
	console.log('');
	console.log('========== NEW ASK CHAT RESPONSE ===========');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('=== RESPONSE: ' + req.body.response);
	console.log('============================================');
	
	User.findOneAndUpdate({ID: req.body.ID}, {ask_chat: req.body.response}).then(item => {
		console.log('=== Ask chat response updated to: ' + req.body.response);
		console.log('============================================');
		console.log('');
	})
	.catch(err => {
		console.log('=== Error while updating ask chat response...');
		console.log('============================================');
		console.log('');
	});
	
	if (req.body.response == 'NO') {
		var thisUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();
		var otherID = thisUser[0].partnerID;
	
		if (checkMatch(req.body.ID, otherID)) {
			unMatchUsers(req.body.ID, otherID);
		}
	}
	
	res.end();
});

app.post('/api/need_match', async function(req, res) {
	var checkUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();	
	if (checkUser.length == 1) {
		if (checkUser[0].hasPartner == "YES") {
			res.sendStatus(200).end();
		}
		else {									
				var otherUser = await User.find({$and: [{hasPartner: "NO"}, {ID: {$not: {$eq: req.body.ID}}}, {isReady: "YES"}]}).limit(1).lean().exec();
				if ((otherUser.length == 1) && (otherUser[0].isReady == 'YES')) {
					
					var otherUserID = otherUser[0].ID;
					const newMatchID = uniqueKey();
					
					await User.findOneAndUpdate({ID: req.body.ID}, {hasPartner: "YES"});
					await User.findOneAndUpdate({ID: otherUserID}, {hasPartner: "YES"});
					
					await User.findOneAndUpdate({ID: req.body.ID}, {partnerID: otherUserID});
					await User.findOneAndUpdate({ID: otherUserID}, {partnerID: req.body.ID});
					
					await User.findOneAndUpdate({ID: req.body.ID}, {match_found: ""});
					await User.findOneAndUpdate({ID: otherUserID}, {match_found: ""});
					
					await User.findOneAndUpdate({ID: req.body.ID}, {matchID: newMatchID});
					await User.findOneAndUpdate({ID: otherUserID}, {matchID: newMatchID});
					
					await User.findOneAndUpdate({ID: req.body.ID}, {isReady: 'NO'}); 
					await User.findOneAndUpdate({ID: otherUserID}, {isReady: 'NO'}); 
					
					console.log('');
					console.log('============== MATCHING USERS ==============');
					console.log('=== User 1: ' + req.body.ID);
					console.log('=== User 2: ' + otherUserID);
					console.log('============================================');
					console.log('');		
					res.sendStatus(200).end();
				}
				else {
					res.sendStatus(204).end();
				}								
		}	
	}
	else {
		res.sendStatus(404).end();
	}
});

app.post('/api/browser_exit', async function(req, res) {
	var checkUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();	
	if (checkUser.length == 1) {
		await User.findOneAndRemove({ID: req.body.ID});
			console.log('');
			console.log('========== BROWSER EXIT DETECTED ===========');
			console.log('=== Removing User: ' + req.body.ID);
			console.log('============================================');
			console.log('');	
	}
	res.sendStatus(200).end();
});

app.post('/api/post_pic', function(req, res) {
	
	if (req.body.image_status == 'first') {
			User.findOneAndUpdate({ID: req.body.ID}, {pic1: req.body.image_data}).then(item => {
			console.log('');
			console.log('============================================');
			console.log('=== Updating ' + req.body.ID + "'s pic1...");
			console.log('============================================');
			console.log('');
		})
		.catch(err => {
			console.log('');
			console.log('============================================');
			console.log('=== Error while updating ' + req.body.ID + "'s pic1...");
			console.log('============================================');
			console.log('');
		});
	}
	else if (req.body.image_status == 'second') {
		User.findOneAndUpdate({ID: req.body.ID}, {pic2: req.body.image_data}).then(item => {
			console.log('');
			console.log('============================================');
			console.log('=== Updating ' + req.body.ID + "'s pic2...");
			console.log('============================================');
			console.log('');
		})
		.catch(err => {
			console.log('');
			console.log('============================================');
			console.log('=== Error while updating ' + req.body.ID + "'s pic2...");
			console.log('============================================');
			console.log('');
		});
	}
	
	res.sendStatus(200).end();
	
});

<<<<<<< HEAD
// Listen in on local server
// should be web server
=======
app.post('/api/get_pic', async function(req, res) {
	
	var thisUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();
	var otherUser = await User.find({ID: thisUser[0].partnerID}).limit(1).lean().exec();
	
	if (otherUser.length == 1) {
		if (req.body.image_status == 'first') {
			var imageToSend = otherUser[0].pic1;
			res.status(200).send(imageToSend);
		}
		else if (req.body.image_status == 'second') {
			var imageToSend = otherUser[0].pic2;
			res.status(200).send(imageToSend);
		}
	}
	
});

app.post('/api/get_update_client', async function(req, res) {
	
	var thisUser = await User.find({ID: req.body.ID}).limit(1).lean().exec();
	var otherUser = await User.find({ID: thisUser[0].partnerID}).limit(1).lean().exec();
	if (otherUser.length == 1) {
		var dataToSend = otherUser[0].username;
		res.status(200).send(dataToSend);
	}
	else {
		res.sendStatus(404).end();
	}
	
});



>>>>>>> 712ff87f526fdd4021746b98158a638a006500ae
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

<<<<<<< HEAD
	// CLIENT STOPS TYPING
	socket.on('stop typing', function() {
		socket.broadcast.emit('stop typing', function() {
			username: socket.username;
		});
=======













/*
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
	socket.emit('message', "You are connected");
	addUsers();
	socket.on('new_username', function(username) {
		socket.username = username;
>>>>>>> 712ff87f526fdd4021746b98158a638a006500ae
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
