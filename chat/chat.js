/**
 * File: chat.js
 *
 * Handle chat client-side interactions.
 * Uses socket.io to trigger and emit messages.
 */
// Socket.io connection listen in on URL

var socket = io.connect();
var urlSessionID = document.URL.split("/")[4];
var sendButton = document.getElementById("chatbox-sendbutton");
/**********************************************
 * PREVENTS PAGE RELOAD ON SEND BUTTON CLICK
 * DO NOT REMOVE
 **********************************************/
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
});
/**********************************************
 * PREVENTS PAGE RELOAD ON SEND BUTTON CLICK
 **********************************************/

sendButton.addEventListener('click', handleSendButtonClick);
socket.on('connect', function() {
  socket.emit('createSession', urlSessionID);
});

/** Listen for newMessage event on client-side,
 * add message to chat body
*/
socket.on('newMessage', function(message) {
  addMessage(message);
});

/** encodeHTML
 * sanitize input
 */
function encodeHTML(str) {
  return $('<div />').text(str).html();
}

/** handleSendButtonClick
 * client is emitting a new message
 * add it to chatbox stream
 * emit newMessage event
 */
function handleSendButtonClick() {
  var message = getInputMessage();
  // Socket server is listening for new message
  socket.emit('newMessage', message);
}

/** addMessage
 * add message to chatbox stream.
 */
function addMessage(message) {
  var username = encodeHTML(message.username);
  var content = encodeHTML(message.content);

  var html = `<li class="chatbox-user-message">
              <span class="chatbox-message-username">${username}</span>
              <span class="chatbox-message-value">${content}</span>
              </li>`;
  // Add Message to stream of messages
  $(html).appendTo(".chatbox-chatstream ul").hide().slideDown(200);
  $('.chatbox-chatstream ul').animate({scrollTop: $('.chatbox-chatstream ul').prop("scrollHeight")}, 500);
}

/** getInputMessage
 * retrieve input
 * return message object
 */
function getInputMessage() {
  var username = getUsername();
  var content = document.getElementById("chatbox-input");
  var contentVal = content.value;
  if (content !== '') {
    console.log("=============================");
    console.log("== SUCCESS: Retrieving input");
    console.log("=============================");
    var message = {
      username: username,
      content: contentVal,
      sessionID: urlSessionID
    };
    // Clear message input
    content.value = '';
    // Return message
    return message;
  } else {
    console.log("=============================");
    console.log("== Send: Chat Input Empty");
    console.log("=============================");
  }
}

function getUsername() {
  /** GET USERNAME **/
}
