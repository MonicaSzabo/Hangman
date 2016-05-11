var wordBank = ["wookie", "skywalker", "droid", "galaxy", "jedi", "princess", "ewoks",
	"tauntaun", "lando", "master", "destroyer", "sandpeople", "padme", "tatooine", "palpatine",
	"yoda", "chewbacca", "kenobi", "lightsaber", "jawa", "han", "anakin", "vader", "dagobah",
	"hutt", "sith", "knight", "force", "republic", "ship", "rebel", "hoth", "luke", "leia", "rey",
	"finn", "poe", "fett", "jango", "boba", "blaster", "alderaan", "darth", "midichlorian", "clone",
	"kylo", "phasma", "captain", "pilot", "queen", "solo", "dameron", "hux", "fighter", "sarlacc",
	"jabba", "empire", "emperor", "sidious", "maul", "wampa", "galactic", "order", "dark", "light",
	"endor", "dooku", "battle", "grievous", "podracing", "stormtrooper", "amidala"];		//Words It Can Be
var wins = 0;					//How many wins
var guessWord = "";				//Empty String, will hold their guesses
var turns = 12;					//How many turns left
var lettersTried = [];			//Letters they have guessed

var currentWord = wordBank[Math.floor(Math.random()*wordBank.length)];

for(var i = 0; i < currentWord.length; i++) {
	guessWord = guessWord + "_";
}

document.querySelector('#game').innerHTML = "Current Word:<br>" + guessWord +
	"<br><br> Number of Guesses:<br>" + turns +
	"<br><br> Letters Already Guessed:<br>" + lettersTried +
	"<br><br>Wins:<br>" + wins;


function replaceLetter(str, i, letter) {
	if(i > str.length-1) {	//Just in case errors, should never run
		return str;
	}
	return str.substr(0, i) + letter + str.substr(i + 1);
}

function inArray(letter, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == letter) {
			return true;
		}
	}
	return false;
}

function reset() {
	currentWord = wordBank[Math.floor(Math.random()*wordBank.length)];
	guessWord = "";
	for(var i = 0; i < currentWord.length; i++) {
		guessWord = guessWord + "_";
	}
	turns = 12;
	lettersTried = [];
	changeImage(turns);
}

function changeImage(turns) {
	if(turns == 12) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan01.jpg";
	}
	else if(turns == 10) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan02.jpg";
	}
	else if(turns == 8) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan03.jpg";
	}
	else if(turns == 6) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan04.jpg";
	}
	else if(turns == 4) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan05.jpg";
	}
	else if(turns == 2) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan06.jpg";
	}
	else if(turns == 1) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan07.jpg";
	}
}

//Functions to create win/lose pop ups
function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-128;//128 is half popup's height, pic 600x256
	popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-300;//300 is half popup's width, pic 600x256
	popUpDiv.style.left = window_width + 'px';
}
function popup(windowname) {
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);		
}

document.onkeyup = function(event) {
	var letter = String.fromCharCode(event.keyCode).toLowerCase();
	var inWord = false;

	for(var i = 0; i < currentWord.length; i++) {
		if(letter == currentWord[i]) {
			guessWord = replaceLetter(guessWord, i, letter);
			inWord = true;
		}
	}
	if(!inWord && !inArray(letter, lettersTried)) {
		lettersTried.push(letter);
		turns--;
	}

	changeImage(turns);

	if(guessWord.indexOf("_") === -1) {
		popup('popUpDiv2');
		var winning = new Audio('assets/youwon.mp3');
		winning.play();
		wins++;
		reset();
	}

	if(turns == 0) {
		popup('popUpDiv');
		var explosion = new Audio('assets/youlost.mp3');
		explosion.play();
		reset();
	}

	var html = "Current Word:<br>" + guessWord +
		"<br><br> Number of Guesses:<br>" + turns +
		"<br><br> Letters Already Guessed:<br>" + lettersTried +
		"<br><br>Wins:<br>" + wins;

	document.querySelector('#game').innerHTML = html;

}