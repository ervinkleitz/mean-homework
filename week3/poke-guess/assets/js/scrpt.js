$(document).ready(function(){
	// Hides the sad Tepig images
	document.getElementById('tepig1').style.visibility = 'hidden';
	document.getElementById('tepig2').style.visibility = 'hidden';
	document.getElementById('tepig3').style.visibility = 'hidden';

	// Pokemon object constructor
	var Pokemon = function( name, path ){
		this.name = name;
		this.path = path;
	};
	// Pokemon list, names shortened for array
	var p1 = new Pokemon( 'bulbasaur','assets/img/001.png' );
	var p2 = new Pokemon( 'ivysaur','assets/img/002.png' );
	var p3 = new Pokemon( 'venusaur','assets/img/003.png' );
	var p4 = new Pokemon( 'charmander','assets/img/004.png' );
	var p5 = new Pokemon( 'charmeleon','assets/img/005.png' );
	var p6 = new Pokemon( 'charizard','assets/img/006.png' );
	var p7 = new Pokemon( 'squirtle','assets/img/007.png' );
	var p8 = new Pokemon( 'wartortle','assets/img/008.png' );
	var p9 = new Pokemon( 'blastoise','assets/img/009.png' );
	var p10 = new Pokemon( 'caterpie','assets/img/010.png' );
	var p11 = new Pokemon( 'metapod','assets/img/011.png' );
	var p12 = new Pokemon( 'butterfree','assets/img/012.png' );
	var p13 = new Pokemon( 'weedle','assets/img/013.png' );
	var p14 = new Pokemon( 'kakuna','assets/img/014.png' );
	var p15 = new Pokemon( 'beedrill','assets/img/015.png' );
	var p16 = new Pokemon( 'pidgey','assets/img/016.png' );
	var p17 = new Pokemon( 'pidgeotto','assets/img/017.png' );
	var p18 = new Pokemon( 'pidgeot','assets/img/018.png' );
	var p19 = new Pokemon( 'rattata','assets/img/019.png' );
	var p20 = new Pokemon( 'raticate','assets/img/020.png' );
	// Array for all Pokemon
	var pokemonArray 
		= [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20];

	var randomPokemon, pokemonPath;
	var isRight = false;
	var score = 0;
	var didUserClick = false;
	var alreadyChosenPokemon = [];

	// Picks a random Pokemon
	getRandomPokemon();

	document.getElementById( 'sendPokemon' ).addEventListener( 'click', checkPokemon );

	// Countdown timer
	var losses = 0;
	mainTimer();

	function mainTimer() {
		var counter = 9;
		var timer = setInterval( countDown, 1000 );

		function countDown(){
			// Checks if player score has reached 5, if so, lets player know he/she has won
			if ( score === 5 && losses < 3 ) { 
				document.getElementById( 'win' ).play(); 
				clearInterval( timer ); 
				myModalWin();
				return; 
			}
			// Checks if player has had 3 wrong guesses, if so plays gameOver audio and Lose Modal
			if ( losses === 3 ) { document.getElementById( 'gameOver' ).play(); clearInterval( timer ); myModalLose(); return; }
			// If player has entered a wrong guess
			if ( isRight === false ) {

				if ( counter > 0 && losses < 3) {
					document.getElementById( 'timerdisplay' ).innerHTML = 'Time Remaining: 0:0' + counter;
					counter --;
					// If player is unsuccessful or time runs out
				} else if ( counter === 0 && losses < 3 ) {
					document.getElementById( 'timerdisplay' ).innerHTML = 'Time Remaining: 0:0' + counter;
					//Plays wrong sound
					document.getElementById( 'wrong' ).play(); 
					// Increments number of losses if player does not guess the right Pokemon before time runs out
					losses++;
					clearInterval( timer );
					repeatCountdown();
					// Makes a Tepig visible for each loss
					switch ( losses ) {
						case 1: document.getElementById( 'tepig1' ).style.visibility = 'visible'; break;
						case 2: document.getElementById( 'tepig2' ).style.visibility = 'visible'; break;
						case 3: document.getElementById( 'tepig3' ).style.visibility = 'visible'; break;
						default: break;
					}

				} else { return; }
			// Runs if player has made a correct guess
			} else {
				clearInterval( timer );
				repeatCountdown();
				isRight = false;
			}
		}

		return;
	}

	// Counts down again after first countdown
	function repeatCountdown(){
		mainTimer(); 
		getRandomPokemon();
		document.getElementById( 'sendPokemon' ).addEventListener('click', checkPokemon);
		document.getElementById( 'inputPokemon' ).value = '';
	}
	// Checks if Pokemon entered was right/wrong

	function checkPokemon() {
		var userPokemonToCheck = document.getElementById('inputPokemon').value.toLowerCase();

			if ( userPokemonToCheck === pokemonArray[randomPokemon]['name'] ) {
				document.getElementById( 'correct' ).play();
				score++;
				isRight = true;
				// Used different pokeballs (greatball, ultraball, etc.)
				switch( score ) {
					case 1: document.getElementById( 'pokeball1' ).src = 'assets/img/new_pokeball.png'; break;
					case 2: document.getElementById( 'pokeball2' ).src = 'assets/img/premier_ball.png'; break;
					case 3: document.getElementById( 'pokeball3' ).src = 'assets/img/greatball.png'; break;
					case 4: document.getElementById( 'pokeball4' ).src = 'assets/img/ultraball.png'; break;
					case 5: document.getElementById( 'pokeball5' ).src = 'assets/img/masterball.png'; break;
					default: break;

				repeatCountdown();

				}

			} else { 
				document.getElementById( 'wrong' ).play(); 
			}
		didUserClick = true;
	}
	// Picks random Pokemon that hasn't already been shown
	function getRandomPokemon(){

		randomPokemon = parseInt( Math.floor( Math.random() * 20 ) );

		if ( alreadyChosenPokemon.indexOf( randomPokemon ) === -1 ) {
			// Makes sure that previously shown Pokemon doesn't get shown again
			alreadyChosenPokemon.push( randomPokemon );
			// Path for corresponding image for random Pokemon
			pokemonPath = pokemonArray[ randomPokemon ][ 'path' ];
			// Displays image of random Pokemon
			document.getElementById( 'pokemonimage' ).setAttribute( 'src',pokemonPath );

		} else {
			// Runs function again if Pokemon has already been shown
			getRandomPokemon();
		}


	}

	function myModalWin() {
		document.getElementById( 'myDialogWin' ).showModal();
	}

	function myModalLose() {
		document.getElementById( 'myDialogLose' ).showModal();
	}

});