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
var timer_count1 = document.getElementById('countdown-number1');
var timer_count2 = document.getElementById('countdown-number2');
var timer1_circle = document.getElementsByClassName('first_timer')[0];
var timer2_circle = document.getElementsByClassName('second_timer')[0];


var main_connect = document.getElementsByClassName('button_connect')[0];
var askchatmodal_yes = document.getElementsByClassName('askchatmodal_yes')[0];
var askchatmodal_no = document.getElementsByClassName('askchatmodal_no')[0];
var matchfound_yes = document.getElementsByClassName('matchfound_yes')[0];
var matchfound_no = document.getElementsByClassName('matchfound_no')[0];

var sigCanvas1 = document.getElementsByClassName('canvas1')[0];
var sigCanvas2 = document.getElementsByClassName('canvas2')[0];
var context1 = sigCanvas1.getContext("2d");
var context2 = sigCanvas2.getContext("2d");
var colorToUse = 000000;


/*
			TIMER FUNCTIONS          
								AUTHOR: Darius			*/	
function startTimer1() {
	timer_count1.textContent = 30;
	function updateText(input) {
		var current_count = timer_count1.textContent;
		timer_count1.textContent = current_count - 1;
	}
	
	setInterval(updateText, 1000);
	setTimeout(endTimer1, 30000);
}

function endTimer1() {
		$('.first_timer').css("display", "none");
		function continueF() {
			$('.times_up').fadeIn(1000);
		}
		$('.draw_pic1').fadeOut(1000, continueF);
	setTimeout(timesup_to_loading1, 1500);
}

function startTimer2() {
	timer_count2.textContent = 30;
	function updateText(input) {
		var current_count = timer_count2.textContent;
		timer_count2.textContent = current_count - 1;
	}
	
	setInterval(updateText, 1000);
	setTimeout(endTimer2, 30000);
}

function endTimer2() {
		$('.second_timer').css("display", "none");
		function continueF() {
			$('.times_up').fadeIn(1000);
		}
		$('.draw_pic2').fadeOut(1000, continueF);
	setTimeout(timesup_to_loading2, 1500);
}




/*
			START-UP CODE          
								AUTHOR: Darius			*/	
function enableConnect_button() {
	$('.button_connect').prop("disabled", false)
}

$(document).ready(function() {
	$('.home_screen').fadeIn(5000, enableConnect_button)
	initialize1();
	initialize2();
});






/*
			FLOW FUNCTIONS          
								AUTHOR: Darius			*/											
function main_to_drawpic1() {
	if (username_box.value != "") {
		$('.button_connect').prop("disabled", true);
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
	$('.matchfound_yes').prop("disabled", true);
	function continueF() {
			$('.draw_pic2').fadeIn(1000, startTimer2());
		}
		$('.match_found').fadeOut(1000, continueF);
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
			CANVAS FUNCTIONS          
								AUTHOR: Darius			*/	
function getPosition1(mouseEvent, sigCanvas1) {
         var x, y;
         if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
            x = mouseEvent.pageX;
            y = mouseEvent.pageY;
         } else {
            x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
         }
 
         return { X: x - sigCanvas1.offsetLeft, Y: y - sigCanvas1.offsetTop };
}

function getPosition2(mouseEvent, sigCanvas2) {
         var x, y;
         if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
            x = mouseEvent.pageX;
            y = mouseEvent.pageY;
         } else {
            x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
         }
 
         return { X: x - sigCanvas2.offsetLeft, Y: y - sigCanvas2.offsetTop };
}

function updateColor() {
		context1.strokeStyle = colorToUse;
		context2.strokeStyle = colorToUse;
}

function initialize1() {
                   
         var is_touch_device = 'ontouchstart' in document.documentElement;
 
         if (is_touch_device) {
            var drawer = {
               isDrawing: false,
               touchstart: function (coors) {
                  context1.beginPath();
                  context1.moveTo(coors.x, coors.y);
                  this.isDrawing = true;
               },
               touchmove: function (coors) {
                  if (this.isDrawing) {
                     context1.lineTo(coors.x, coors.y);
                     context1.stroke();
                  }
               },
               touchend: function (coors) {
                  if (this.isDrawing) {
                     this.touchmove(coors);
                     this.isDrawing = false;
                  }
               }
            };
 
            function draw(event) {
 
               var coors = {
                  x: event.targetTouches[0].pageX,
                  y: event.targetTouches[0].pageY
               };
 
               var obj = sigCanvas1;
 
               if (obj.offsetParent) {
                  do {
                     coors.x -= obj.offsetLeft;
                     coors.y -= obj.offsetTop;
                  }
                  while ((obj = obj.offsetParent) != null);
               }

               drawer[event.type](coors);
            }
 
            sigCanvas1.addEventListener('touchstart', draw, false);
            sigCanvas1.addEventListener('touchmove', draw, false);
            sigCanvas1.addEventListener('touchend', draw, false);
 
            sigCanvas1.addEventListener('touchmove', function (event) {
               event.preventDefault();
            }, false); 
         }
         else {

            $(".canvas1").mousedown(function (mouseEvent) {
               var position = getPosition1(mouseEvent, sigCanvas1);
 
               context1.moveTo(position.X, position.Y);
               context1.beginPath();

               $(this).mousemove(function (mouseEvent) {
                  drawLine1(mouseEvent, sigCanvas1, context1);
               }).mouseup(function (mouseEvent) {
                  finishDrawing(mouseEvent, sigCanvas1, context1);
               }).mouseout(function (mouseEvent) {
                  finishDrawing(mouseEvent, sigCanvas1, context1);
               });
            });
 
         }
}

function initialize2() {
                   
         var is_touch_device = 'ontouchstart' in document.documentElement;
 
         if (is_touch_device) {
            var drawer = {
               isDrawing: false,
               touchstart: function (coors) {
                  context2.beginPath();
                  context2.moveTo(coors.x, coors.y);
                  this.isDrawing = true;
               },
               touchmove: function (coors) {
                  if (this.isDrawing) {
                     context2.lineTo(coors.x, coors.y);
                     context2.stroke();
                  }
               },
               touchend: function (coors) {
                  if (this.isDrawing) {
                     this.touchmove(coors);
                     this.isDrawing = false;
                  }
               }
            };
 
            function draw(event) {
 
               var coors = {
                  x: event.targetTouches[0].pageX,
                  y: event.targetTouches[0].pageY
               };
 
               var obj = sigCanvas2;
 
               if (obj.offsetParent) {
                  do {
                     coors.x -= obj.offsetLeft;
                     coors.y -= obj.offsetTop;
                  }
                  while ((obj = obj.offsetParent) != null);
               }

               drawer[event.type](coors);
            }
 
            sigCanvas2.addEventListener('touchstart', draw, false);
            sigCanvas2.addEventListener('touchmove', draw, false);
            sigCanvas2.addEventListener('touchend', draw, false);
 
            sigCanvas2.addEventListener('touchmove', function (event) {
               event.preventDefault();
            }, false); 
         }
         else {

            $(".canvas2").mousedown(function (mouseEvent) {
               var position = getPosition2(mouseEvent, sigCanvas1);
 
               context2.moveTo(position.X, position.Y);
               context2.beginPath();

               $(this).mousemove(function (mouseEvent) {
                  drawLine2(mouseEvent, sigCanvas2, context2);
               }).mouseup(function (mouseEvent) {
                  finishDrawing(mouseEvent, sigCanvas2, context2);
               }).mouseout(function (mouseEvent) {
                  finishDrawing(mouseEvent, sigCanvas2, context2);
               });
            });
 
         }
}

function drawLine1(mouseEvent, sigCanvas1, context1) {
 
         var position = getPosition1(mouseEvent, sigCanvas1);
 
         context1.lineTo(position.X, position.Y - 60);
         context1.stroke();
      }

      function finishDrawing(mouseEvent, sigCanvas1, context1) {
         drawLine1(mouseEvent, sigCanvas1, context1);
 
         context1.closePath();
 
         $(sigCanvas1).unbind("mousemove")
                     .unbind("mouseup")
                     .unbind("mouseout");
}

function drawLine2(mouseEvent, sigCanvas2, context2) {
 
         var position = getPosition2(mouseEvent, sigCanvas2);
 
         context2.lineTo(position.X, position.Y - 60);
         context2.stroke();
      }

      function finishDrawing(mouseEvent, sigCanvas2, context2) {
         drawLine2(mouseEvent, sigCanvas2, context2);
 
         context2.closePath();
 
         $(sigCanvas2).unbind("mousemove")
                     .unbind("mouseup")
                     .unbind("mouseout");
}

/*
			SLIDER FUNCTIONS          
								AUTHOR: Darius			*/	
$(function() {	
	$("#slider-vertical1").slider({
		orientation: "vertical",
		min: 0,
		max: 360,
		value: 0,
		slide: function(event, ui) {		
			$(".topcoat-range-input1").css("background", 'hsl(' + ui.value + ', 100%, 50%)');
			colorToUse = 'hsl(' + ui.value + ', 100%, 50%)';
			updateColor();
		}
	});
});

$(function() {	
	$("#slider-vertical2").slider({
		orientation: "vertical",
		min: 0,
		max: 360,
		value: 0,
		slide: function(event, ui) {		
			$(".topcoat-range-input2").css("background", 'hsl(' + ui.value + ', 100%, 50%)');
			colorToUse = 'hsl(' + ui.value + ', 100%, 50%)';
			updateColor();
		}
	});
});













/*
			EVENT LISTENERS          
								AUTHOR: TEAM			*/
main_connect.addEventListener('click', main_to_drawpic1);
askchatmodal_yes.addEventListener('click', askchatmodal_yes_f);
askchatmodal_no.addEventListener('click', askchatmodal_no_f);
matchfound_yes.addEventListener('click', matchfound_to_drawpic2);
matchfound_no.addEventListener('click', matchfound_to_loading);
