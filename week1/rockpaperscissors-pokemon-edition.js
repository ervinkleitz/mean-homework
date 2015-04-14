var readlineSync = require('readline-sync');

var playerInput = 
	readlineSync.question( '\nPlease type in your pokemon type (earth, grass or fire): ' ).trim().toLowerCase();

var mode = 
	readlineSync.question( '\nPick your mode... \nType always-win, always-lose, or any key for normal: ' ).trim().toLowerCase();

// Computes computer's choice
var choices = ['earth', 'grass', 'fire'];
var computerChoice = function () {
	return choices[Math.floor ( Math.random() * choices.length )];
};

// Checks which play mode to run and runs it
mode == 'always-win'? playerWins(): ( mode == 'always-lose'? computerWins(): normal() )

//Function when user chooses 'normal' mode
function normal() {

	var keepRunning = true;
//Loops until computer makes a choice that is not the same as the player's.
	while ( keepRunning ) {

		var pick = computerChoice();
		choiceOut( pick );

		switch ( playerInput ) {

			case 'earth':
			case 'e':
			case 'ea':
			case 'ear':
			case 'eart':
				if (pick == 'grass') {
					lose();
					keepRunning = false;
				} else if (pick == 'fire') {
					win();
					keepRunning = false;
				} else {
					console.log('Computer will re-pick');
				}
				break;

			case 'grass':
			case 'g':
			case 'gr':
			case 'gra':
			case 'gras':
				if (pick == 'fire') {
					lose();
					keepRunning = false;
				} else if (pick == 'earth'){
					win();
					keepRunning = false;
				} else {
					console.log('Computer will re-pick');
				}
				break;

			case 'fire':
			case 'f':
			case 'i':
			case 'r':
				if (pick == 'earth') {
					lose();
					keepRunning = false;
				} else if (pick == 'grass'){
					win();
					keepRunning = false;
				} else {
					console.log('Computer will re-pick');
				}
				break;

				default:
				console.log('Your choice was invalid.')
				keepRunning = false;
				break;
		}
	}
}
//Function when user picks to player-win mode
function playerWins() {

	var keepRunning = true;
//Loops until computer makes a choice that will make the player win.
	while ( keepRunning ) {

		var pick = computerChoice();

		switch ( playerInput ) {

			case 'earth':
			case 'e':
			case 'ea':
			case 'ear':
			case 'eart':
				if (pick == 'fire') {
					choiceOut( pick );
					win();
					keepRunning = false;
				}
				break;

			case 'grass':
			case 'g':
			case 'gr':
			case 'gra':
			case 'gras':
				if (pick == 'earth') {
					choiceOut( pick );
					win();
					keepRunning = false;
				}
				break;

			case 'fire':
			case 'fire':
			case 'f':
			case 'i':
			case 'r':
				if (pick == 'grass') {
					choiceOut( pick );
					win();
					keepRunning = false;
				}
				break;

				default:
				console.log('Your choice was invalid.')
				keepRunning = false;
				break;
		}
	}
}

//Function when user picks to player-win mode
function computerWins() {

	console.log( 'You chose ' + playerInput );
	var keepRunning = true;
//Loops until computer makes a choice that will make the player lose.
	while ( keepRunning ) {

		var pick = computerChoice();

		switch ( playerInput ) {

			case 'earth':
			case 'e':
			case 'ea':
			case 'ear':
			case 'eart':
				if (pick == 'grass') {
					choiceOut( pick );
					lose();
					keepRunning = false;
				}
				break;

			case 'grass':
			case 'g':
			case 'gr':
			case 'gra':
			case 'gras':
				if (pick == 'fire') {
					choiceOut( pick );
					lose();
					keepRunning = false;
				}
				break;

			case 'fire':
			case 'fire':
			case 'f':
			case 'i':
			case 'r':
				if (pick == 'earth') {
					choiceOut( pick );
					lose();
					keepRunning = false;
				}
				break;

				default:
				console.log('Your choice was invalid.')
				keepRunning = false;
				break;
		}
	}
}

// Function to print that player won
function lose () {
	console.log( 'Sorry, you lose.' );
}
// Function to print player's loss
function win () {
	console.log( 'You win!' );
}
// Function to print out computer's choice
function choiceOut (choice) {
	console.log ( 'Computer chose ' + choice );
}