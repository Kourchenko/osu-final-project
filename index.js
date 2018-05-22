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
var timer_count2 = document.getElementsByClassName('timer2')[0];
var load_count = document.getElementsByClassName('load_bar')[0];



var main_connect = document.getElementById('clickconnect');
var askchatmodal_yes = document.getElementsByClassName('askchatmodal_yes')[0];
var askchatmodal_no = document.getElementsByClassName('askchatmodal_no')[0];
var matchfound_yes = document.getElementsByClassName('matchfound_yes')[0];
var matchfound_no = document.getElementsByClassName('matchfound_no')[0];


/*
			TIMER FUNCTIONS          
								AUTHOR: Darius			*/	
function startTimer1() {
	
	function updateText(input) {
		var current_count = timer_count1.innerHTML;
		timer_count1.innerHTML = current_count - 1;
	}
	
	setInterval(updateText, 1000);
	setTimeout(endTimer1, 15000);
}

function endTimer1() {
	drawpic1.classList.add('hidden');
	times_up.classList.remove('hidden');
	setTimeout(timesup_to_loading1, 2000);
}

function startTimer2() {
	
	function updateText(input) {
		var current_count = timer_count2.innerHTML;
		timer_count2.innerHTML = current_count - 1;
	}
	
	setInterval(updateText, 1000);
	setTimeout(endTimer2, 10000);
}

function endTimer2() {
	drawpic2.classList.add('hidden');
	times_up.classList.remove('hidden');
	setTimeout(timesup_to_loading2, 2000);
}








/*
			FLOW FUNCTIONS          
								AUTHOR: Darius			*/											
function main_to_drawpic1() {
    main.classList.add('hidden');
    drawpic1.classList.remove('hidden');
	startTimer1();
}

function drawpic1_to_loading() {
	drawpic1.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control();
}

function loading_to_matchfound() {
	loading.classList.add('hidden');
	match_found.classList.remove('hidden');
}

function loading_to_chat() {
	loading.classList.add('hidden');
	//UNHIDE CHAT PAGE HERE
}

function matchfound_to_loading() {
	match_found.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control1();
}

function matchfound_to_drawpic2() {
	match_found.classList.add('hidden');
	drawpic2.classList.remove('hidden');
	startTimer2();
}

function drawpic2_to_askchatmodal() {
	drawpic2.classList.add('hidden');
	askchatmodal.classList.remove('hidden');
}

function askchatmodal_no() {
	askchatmodal.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control1();
}

function askchatmodal_yes() {
	askchatmodal.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control2();
}

function timesup_to_loading1() {
	times_up.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control1();
}

function timesup_to_loading2() {
	times_up.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control2();
}



function loading_screen_control1() {
	setTimeout(loading_to_matchfound, 5000);
	function updateText(input) {
		if (load_count.innerHTML == "Loading...") {
			load_count.innerHTML = "Loading.";
		}
		else if (load_count.innerHTML == "Loading.") {
			load_count.innerHTML = "Loading..";
		}
		else if (load_count.innerHTML == "Loading..") {
			load_count.innerHTML = "Loading...";
		}
	}
	setInterval(updateText, 300);
}

function loading_screen_control2() {
	setTimeout(loading_to_chat, 5000);
	function updateText2(input) {
		if (load_count.innerHTML == "Loading...") {
			load_count.innerHTML = "Loading.";
		}
		else if (load_count.innerHTML == "Loading.") {
			load_count.innerHTML = "Loading..";
		}
		else if (load_count.innerHTML == "Loading..") {
			load_count.innerHTML = "Loading...";
		}
	}
	
	setInterval(updateText2, 300);
}








/*
			EVENT LISTENERS          
								AUTHOR: TEAM			*/
main_connect.addEventListener('click', main_to_drawpic1);
askchatmodal_yes.addEventListener('click', askchatmodal_yes);
askchatmodal_no.addEventListener('click', askchatmodal_no);
matchfound_yes.addEventListener('click', matchfound_to_drawpic2);
matchfound_no.addEventListener('click', matchfound_to_loading);
