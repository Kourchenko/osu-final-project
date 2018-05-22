/* JS */

// Modal hidden flags
var DIV_USERNAME_HIDDEN = false; // 1st to load
var DIV_DRAW_HIDDEN = true; // 2nd
var DIV_LOADING_HIDDEN = true; // 3rd
var DIV_MATCH_HIDDEN = true; // 4th 






/*
			ELEMENT CONNECTORS          
								AUTHOR: TEAM			*/
var main = document.getElementsByClassName('home_screen')[0];
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


var main_connect = document.getElementsByClassName('button_connect')[0];
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
		function continueF() {
			$('.times_up').fadeIn(1000);
		}
		$('.draw_pic1').fadeOut(1000, continueF);
	setTimeout(timesup_to_loading1, 1500);
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
		function continueF() {
			$('.times_up').fadeIn(1000);
		}
		$('.draw_pic2').fadeOut(1000);
	setTimeout(timesup_to_loading2, 1500);
}

$(document).ready(($('.home_screen').fadeIn(5000)));



/*
			FLOW FUNCTIONS          
								AUTHOR: Darius			*/											
function main_to_drawpic1() {
	if (username_box.value != "") {
		
		function continueF() {
			$('.draw_pic1').fadeIn(1000, startTimer1);
		}
		$('.home_screen').fadeOut(1000, continueF);
		
	}
	else {
		username_error_text.classList.remove('hidden');
	}
}

function drawpic1_to_loading() {
	function continueF() {
			$('.loading_screen').fadeIn(1000, loading_screen_control);
		}
		$('.draw_pic1').fadeOut(1000, continueF);
}

function loading_to_matchfound() {
	function continueF() {
			$('.match_found').fadeIn(1000);
		}
		$('.loading_screen').fadeOut(1000, continueF);
}

function loading_to_chat() {
	function continueF() {
			$('.chatbox').fadeIn(1000);
		}
		$('.loading_screen').fadeOut(1000, continueF);
}

function matchfound_to_loading() {
	function continueF() {
			$('.loading_screen').fadeIn(1000, loading_screen_control1);
		}
		$('.match_found').fadeOut(1000, continueF);
}

function matchfound_to_drawpic2() {
	function continueF() {
			$('.draw_pic2').fadeIn(1000);
		}
		$('.match_found').fadeOut(1000, continueF);
	startTimer2();
}

function drawpic2_to_askchatmodal() {
	function continueF() {
			$('.askchatmodal').fadeIn(1000);
		}
		$('.draw_pic2').fadeOut(1000, continueF);
}

function askchatmodal_no_f() {
	window.location.href = "./index.html";
}

function askchatmodal_yes_f() {
	function continueF() {
			$('.loading_screen').fadeIn(1000, loading_screen_control3);
		}
		$('.askchatmodal').fadeOut(1000, continueF);
}

function timesup_to_loading1() {
		function continueF() {
			$('.loading_screen').fadeIn(1000, loading_screen_control1);
		}
		$('.times_up').fadeOut(1000, continueF);
}

function timesup_to_loading2() {
		function continueF() {
			$('.loading_screen').fadeIn(1000, loading_screen_control2);
		}
		$('.times_up').fadeOut(1000, continueF);
}

function loading_to_askmodal() {
		function continueF() {
			$('.askchatmodal').fadeIn(1000);
		}
		$('.loading_screen').fadeOut(1000, continueF);
}







/*
			LOADING SCREEN FUNCTIONS          
								AUTHOR: Darius			*/	
function loading_screen_control1() {
	setTimeout(loading_to_matchfound, 3000);

}

function loading_screen_control2() {
	setTimeout(loading_to_askmodal, 3000);	

}

function loading_screen_control3() {
	setTimeout(loading_to_chat, 3000);
}












/*
			EVENT LISTENERS          
								AUTHOR: TEAM			*/
main_connect.addEventListener('click', main_to_drawpic1);
askchatmodal_yes.addEventListener('click', askchatmodal_yes_f);
askchatmodal_no.addEventListener('click', askchatmodal_no_f);
matchfound_yes.addEventListener('click', matchfound_to_drawpic2);
matchfound_no.addEventListener('click', matchfound_to_loading);
