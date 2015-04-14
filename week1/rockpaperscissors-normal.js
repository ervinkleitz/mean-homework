var readlineSync = require('readline-sync');

var playerInput = 
	readlineSync.question( '\nPlease type in your choice (rock, paper or scissors): ' ).trim().toLowerCase();

var mode = 
	readlineSync.question( '\nPick your mode... \nType always-win, always-lose, or any key for normal: ' ).trim().toLowerCase();

// Computes computer's choice
var choices = ['rock', 'paper', 'scissors'];
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

			case 'rock':
			case 'r':
			case 'ro':
			case 'roc':
				if (pick == 'paper') {
					lose();
					keepRunning = false;
				} else if (pick == 'scissors') {
					win();
					keepRunning = false;
				} else {
					console.log('Computer will re-pick');
				}
				break;

			case 'paper':
			case 'p':
			case 'pa':
			case 'pap':
			case 'pape':
				if (pick == 'scissors') {
					lose();
					keepRunning = false;
				} else if (pick == 'rock'){
					win();
					keepRunning = false;
				} else {
					console.log('Computer will re-pick');
				}
				break;

			case 'scissors':
			case 's':
			case 'sc':
			case 'sci':
			case 'scis':
			case 'sciss':
			case 'scisso':
			case 'scissor':
				if (pick == 'rock') {
					lose();
					keepRunning = false;
				} else if (pick == 'paper'){
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

			case 'rock':
			case 'r':
			case 'ro':
			case 'roc':
				if (pick == 'scissors') {
					choiceOut( pick );
					win();
					keepRunning = false;
				}
				break;

			case 'paper':
			case 'p':
			case 'pa':
			case 'pap':
			case 'pape':
				if (pick == 'rock') {
					choiceOut( pick );
					win();
					keepRunning = false;
				}
				break;

			case 'scissors':
			case 's':
			case 'sc':
			case 'sci':
			case 'scis':
			case 'sciss':
			case 'scisso':
			case 'scissor':
				if (pick == 'paper') {
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

			case 'rock':
			case 'r':
			case 'ro':
			case 'roc':
				if (pick == 'paper') {
					choiceOut( pick );
					lose();
					keepRunning = false;
				}
				break;

			case 'paper':
			case 'p':
			case 'pa':
			case 'pap':
			case 'pape':
				if (pick == 'scissors') {
					choiceOut( pick );
					lose();
					keepRunning = false;
				}
				break;

			case 'scissors':
			case 's':
			case 'sc':
			case 'sci':
			case 'scis':
			case 'sciss':
			case 'scisso':
			case 'scissor':
				if (pick == 'rock') {
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