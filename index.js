/* JS */

// Modal hidden flags
var DIV_USERNAME_HIDDEN = false; // 1st to load
var DIV_DRAW_HIDDEN = true; // 2nd
var DIV_LOADING_HIDDEN = true; // 3rd
var DIV_MATCH_HIDDEN = true; // 4th 


var main = document.getElementsByClassName('main');
var drawpic1 = document.getElementsByClassName('draw_pic');
var clickconnect = document.getElementByID('clickconnect');

function LeaveMain {
    main.classList.add('hidden');
    drawpic1.classList.remove('hidden');
}

clickconnect.addEventListener('click', LeaveMain);
