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
var chat_page = document.getElementsByClassName('chatbox')[0];



var username_box = document.getElementById('main-username-input');
var username_error_text = document.getElementsByClassName('username_error')[0];
var timer_count1 = document.getElementsByClassName('timer1')[0];
var timer_count2 = document.getElementsByClassName('timer2')[0];


var main_connect = document.getElementById('clickconnect');
var askchatmodal_yes = document.getElementsByClassName('askchatmodal_yes')[0];
var askchatmodal_no = document.getElementsByClassName('askchatmodal_no')[0];
var matchfound_yes = document.getElementsByClassName('matchfound_yes')[0];
var matchfound_no = document.getElementsByClassName('matchfound_no')[0];


/*
			TIMER FUNCTIONS          
								AUTHOR: Darius			*/	
function startTimer1() {
	timer_count1.innerHTML = 5;
	function updateText(input) {
		var current_count = timer_count1.innerHTML;
		timer_count1.innerHTML = current_count - 1;
	}
	
	setInterval(updateText, 1000);
	setTimeout(endTimer1, 5000);
}

function endTimer1() {
	drawpic1.classList.add('hidden');
	times_up.classList.remove('hidden');
	setTimeout(timesup_to_loading1, 2000);
}

function startTimer2() {
	timer_count2.innerHTML = 3;
	function updateText(input) {
		var current_count = timer_count2.innerHTML;
		timer_count2.innerHTML = current_count - 1;
	}
	
	setInterval(updateText, 1000);
	setTimeout(endTimer2, 3000);
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
	if (username_box.value != "") {
		main.classList.add('hidden');
		drawpic1.classList.remove('hidden');
		startTimer1();
	}
	else {
		username_error_text.classList.remove('hidden');
	}
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
	chat_page.classList.remove('hidden');
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

function askchatmodal_no_f() {
	askchatmodal.classList.add('hidden');
	loading.classList.remove('hidden');
	window.location.href = "./index.html";
}

function askchatmodal_yes_f() {
	askchatmodal.classList.add('hidden');
	loading.classList.remove('hidden');
	loading_screen_control3();
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

function loading_to_askmodal() {
	loading.classList.add('hidden');
	askchatmodal.classList.remove('hidden');
}



/*
			LOADING SCREEN FUNCTIONS          
								AUTHOR: Darius			*/	
function loading_screen_control1() {
	setTimeout(loading_to_matchfound, 2000);

}

function loading_screen_control2() {
	setTimeout(loading_to_askmodal, 2000);	

}

function loading_screen_control3() {
	setTimeout(loading_to_chat, 2000);
}








/*
			EVENT LISTENERS          
								AUTHOR: TEAM			*/
main_connect.addEventListener('click', main_to_drawpic1);
askchatmodal_yes.addEventListener('click', askchatmodal_yes_f);
askchatmodal_no.addEventListener('click', askchatmodal_no_f);
matchfound_yes.addEventListener('click', matchfound_to_drawpic2);
matchfound_no.addEventListener('click', matchfound_to_loading);
