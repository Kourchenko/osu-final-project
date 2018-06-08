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
var http = require('http');
var app = require('express')();
var fs = require('fs');
var express = require('express');
var server = http.createServer(app);
var io = require('socket.io')(server);
var bodyparser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
/** socket.io chat server */
// Unique sessionID
var roomSessionID;
var userName1;
/** socket.io */
app.use(express.static('public'));

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

/*
			GET FUNCTIONS
								AUTHOR: Darius			*/
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/index.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

/** Create a chatroom for all. */
app.get('/chat', function(req, res) {
  console.log("REQUEST.URL", req.url);
  roomSessionID = 'allChat';
  res.status(200).sendFile(path.join(__dirname + "/../chat/chat.html"));
});

app.get('*/chat.js', function(req, res) {
  res.status(200).sendFile(path.join(__dirname + "/../chat/chat.js"));
});

/* Create a unique new chat session */
app.get('/chat/:roomSessionID', function(req, res, next) {
  // Save session
  roomSessionID = req.params.roomSessionID;
  console.log("=========================================");
  console.log("== Creating new session:", roomSessionID);
  console.log("=========================================");
  res.status(200).sendFile(path.join(__dirname + "/../chat/chat.html"));
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

app.get('*/style.css', function(req, res) {
	res.sendFile(path.join(__dirname + '/../style.css'));
});

app.get('/index.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/../index.js'));
});

app.get('*/logo_white.png', function(req, res) {
	res.sendFile(path.join(__dirname + '/../images/logo_white.png'));
});

app.get('*/logo.png', function(req, res) {
	res.sendFile(path.join(__dirname + '/../images/logo.png'));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../404.html'));
});

/***********************************
  * Handles socket.io Server events
************************************/
io.on('connect', function(client) {
  // If URL sessionID is valid
  if (roomSessionID) {
    // Client created a session
    client.on('createSession', function(sessionID) {
      console.log("Server joining unique session:", roomSessionID);
      client.join(sessionID);
    });
    // Client newMessage received, broadcast only to (sessionID)
    client.on('newMessage', function(message) {
      io.to(message.sessionID).emit('newMessage', message);
    });
    // Client disconnected
    client.on('disconnect', function() {
      console.log("=========================================");
      console.log("Client disconnected");
      console.log("=========================================");
    });
  }
});


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

/*
			POST FUNCTIONS
								AUTHOR: Darius			*/
app.post('/api/username', function(req, res) {
	console.log('');
	console.log('=============== NEW USER ===================');
	console.log('=== USERNAME: ' + req.body.username);
	console.log('=== ID: ' + req.body.ID);
	console.log('============================================');
  userName1 = req.body.username;
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

// Listen in on local server
// should be web server
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



server.listen(8080, function() {
	console.log('');
	console.log('============================================');
	console.log('=== Server running at http://127.0.0.1:8080/');
	console.log('============================================');
	console.log('');
});
