var wordBank = ["wookie", "skywalker", "droid", "galaxy", "jedi", "podracing", "ewoks", "tauntaun", "lando", "master", "destroyer", "sandpeople", "padme", "tatooine", "palpatine", "yoda", "chewbacca", "kenobi", "lightsaber", "jawa", "han", "anakin", "vader", "dagobah", "hutt", "sith", "knight", "force", "republic", "ship", "rebel", "hoth", "luke", "leia", "rey", "finn", "poe", "fett", "jango", "boba", "blaster", "alderaan"];		//Words It Can Be
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
	else if(turns == 0) {
		document.getElementById("aldaraan").src = "assets/images/aldaraan08.jpg";
	}
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
		alert("You won and saved Aldaraan!  Good job!");
		wins++;
		reset();
	}

	if(turns == 0) {
		alert("Aldaraan has been destroyed!  Try again!");
		var explosion = new Audio('assets/AldaraanExplosion.mp3');
		explosion.play();
		reset();
	}

	var html = "Current Word:<br>" + guessWord +
	"<br><br> Number of Guesses:<br>" + turns +
	"<br><br> Letters Already Guessed:<br>" + lettersTried +
	"<br><br>Wins:<br>" + wins;

	document.querySelector('#game').innerHTML = html;

}