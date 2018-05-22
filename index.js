body {
	padding: 0;
	margin: 0;
	background-color: #fff;
	font-family: 'Dosis', sans-serif;
}


a {
	text-decoration: none;
	color: #fff;
}

/*a:hover {
	color: #a5a9af;
}*/


h3 {
	display: inline-flex;
}

#container {
    position: absolute;
    margin: 0px;
    padding: 0px;
    width: 100%;
	height: 70%;
    overflow: hidden;
	padding-top: 3%;
	padding-bottom: 3%;
}

#logo_white {
	margin-right: 5px;
	margin-bottom: 10px;
}


.navbar {
	padding: 7px;
	background-color: #455A64;
	height: 45px;
}

.navlist {
	margin: 0 0 0 20px;
	padding: 0;
}

.navitem {
	font-weight: bold;
	
	padding: 2px;
	font-size: 30px;
	color: #fff;
	display: inline-block;
	
	white-space: pre;
}


.home_screen {	
	padding-top: 5%;
	float: center;
	display: none;
}

.loading_screen {
	display: none;
}

.draw_pic1 {
	display: none;
}

.draw_pic2 {
	display: none;
}

.times_up {
	display: none;
}

.match_found {
	display: none;
}

.askchatmodal {
	display: none;
}

.chatbox {
	display: none;
}

.info {
	font-size: 22px;
	font-weight: 500;
}


#main-username-input:active,
#main-username-input:focus {
	placeholder: none;
}

.username {
	padding: 10px;
}

input {
	height: 35px;
	width: 350px;
	background-color: #fff;
	color: #000;
	font-weight: 600;
	border: solid 1px #aaa;
	border-radius: 4px;
	font-size: 20px;
	text-align: center;
}

.canvas {
	height: 200px;
	width: 200px;
}

button:hover {
	cursor: pointer;
}


.modal-heading {
	font-size: 24px;
	font-weight: 500;
}

footer {
	padding-top: 10px;
	padding-bottom: 10px;
	color: #fff;
	font-size: 18px;
	bottom: 0;
	margin: 0;
	width: 100%;
	background-color: #455A64;
	position: absolute;
	

}



footer a:hover {
	color: #a5a9af;
}


.hidden {
	display: none;
}

#LoadScreenBackground {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #ffffff;
}

.draw_pic {
	padding-top: 50px;
}

.draw_pic_text {
	font-size: 30px;
	text-align: center;
}

.draw_canvas {
	padding-top: 30px;
	margin-right: 7%;
	text-align: center;
}

.draw_timer {
	padding-top: 24px;
	font-size: 20px;
	text-align: center;
}

.draw_pic_timer {
	margin-top: 2%;
}

.share_pic_btn {
	width: 100%;
	padding-top: 2%;
}

.yes_no_box {
	padding-left: 39.5%;
	display: flex;
	flex-wrap: wrap;
}

.description_text {
	margin-top: 1%;
}


.matchfound_no {
	padding-left: 9%;
}

.askchatmodal_no {
	padding-left: 9%;
}

.username_error {
	color: #c60303;
}

.loader {
	margin-top: 7.5%;
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #455A64; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}


.button_connect {
  display: inline-block;
  border-radius: 4px;
  background-color: #455A64;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 24px;
  padding: 10px;
  width: 200px;
  height: 50px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-top: 1%;
  box-shadow: 0 0 4px #aaa;
}

.button_connect span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;

}

.button_connect span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button_connect:hover span {
  padding-right: 25px;
}

.button_connect:hover span:after {
  opacity: 1;
  right: 0;
}

.button_answer {
  display: inline-block;
  border-radius: 4px;
  background-color: #455A64;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 20px;
  padding: 5px;
  width: 150px;
  height: 40px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-top: 15%;
  box-shadow: 0 0 4px #aaa;
  margin-bottom: 5%;
}

.button_answer:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
	background-color: #2f3d44;
	color: #dbdddd;
}








