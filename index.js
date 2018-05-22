/* JS */

// Modal hidden flags
var DIV_USERNAME_HIDDEN = false; // 1st to load
var DIV_DRAW_HIDDEN = true; // 2nd
var DIV_LOADING_HIDDEN = true; // 3rd
var DIV_MATCH_HIDDEN = true; // 4th






/*
			ELEMENT CONNECTORS
								AUTHOR: TEAM			*/
var main = document.getElementsByClassName('main')[0];
var drawpic1 = document.getElementsByClassName('draw_pic1')[0];
var drawpic2 = document.getElementsByClassName('draw_pic2')[0];
var loading = document.getElementsByClassName('loading_screen')[0];
var match_found = document.getElementsByClassName('match_found')[0];
var askchatmodal = document.getElementsByClassName('askchatmodal')[0];
var times_up = document.getElementsByClassName('times_up')[0];

var timer_count1 = document.getElementsByClassName('timer1')[0];


var main_connect = document.getElementById('clickconnect');
var askchatmodal_yes = document.getElementsByClassName('askchatmodal_yes')[0];
var askchatmodal_no = document.getElementsByClassName('askchatmodal_no')[0];
var matchfound_yes = document.getElementsByClassName('matchfound_yes')[0];
var matchfound_no = document.getElementsByClassName('matchfound_no')[0];


/*
			TIMER FUNCTIONS
								AUTHOR: Darius			*/
function startTimer() {

	function updateText(input) {
		var current_count = timer_count1.innerHTML;
		timer_count1.innerHTML = current_count - 1;
	}

	setInterval(updateText, 1000);
	setTimeout(endTimer, 10000);
}

function endTimer() {
	drawpic1.classList.add('hidden');
	times_up.classList.remove('hidden');
	setTimeout(timesup_to_loading, 2000);
}





/*
			FLOW FUNCTIONS
								AUTHOR: Darius			*/
function main_to_drawpic1() {
    main.classList.add('hidden');
    drawpic1.classList.remove('hidden');
	startTimer();
}

function drawpic1_to_loading() {
	drawpic1.classList.add('hidden');
	loading.classList.remove('hidden');
}

function loading_to_matchfound() {
	loading.classList.add('hidden');
	match_found.classList.remove('hidden');
}

function matchfound_to_loading() {
	match_found.classList.add('hidden');
	loading.classList.remove('hidden');
}

function matchfound_to_drawpic2() {
	match_found.classList.add('hidden');
	drawpic2.classList.remove('hidden');
}

function drawpic2_to_askchatmodal() {
	drawpic2.classList.add('hidden');
	askchatmodal.classList.remove('hidden');
}

function askchatmodal_to_loading() {
	askchatmodal.classList.add('hidden');
	loading.classList.remove('hidden');
}

function askchatmodal_to_chat() {
	askchatmodal.classList.add('hidden');
	// REMOVE HIDDEN FROM CHAT PAGE HERE //
}

function timesup_to_loading() {
	times_up.classList.add('hidden');
	loading.classList.remove('hidden');
}









/*
			EVENT LISTENERS
								AUTHOR: TEAM			*/
//main_connect.addEventListener('click', main_to_drawpic1);
//askchatmodal_yes.addEventListener('click', askchatmodal_chat);
//askchatmodal_no.addEventListener('click', askchatmodal_loading);
//matchfound_yes.addEventListener('click', matchfound_to_drawpic2);
//matchfound_no.addEventListener('click', matchfound_to_loading);
