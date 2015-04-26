$(document).ready(function(){
	// Hides the sad Tepig images
	document.getElementById('tepig1').style.visibility = 'hidden';
	document.getElementById('tepig2').style.visibility = 'hidden';
	document.getElementById('tepig3').style.visibility = 'hidden';

	// Pokemon object constructor
	var Pokemon = function( name, path ){
		this.name = name;
		this.path = path;
	}
	// Pokemon list
	var bulbasaur = new Pokemon( 'bulbasaur','assets/img/001.png' );
	var ivysaur = new Pokemon( 'ivysaur','assets/img/002.png' );
	var venusaur = new Pokemon( 'venusaur','assets/img/003.png' );
	var charmander = new Pokemon( 'charmander','assets/img/004.png' );
	var charmeleon = new Pokemon( 'charmeleon','assets/img/005.png' );
	var charizard = new Pokemon( 'charizard','assets/img/006.png' );
	var squirtle = new Pokemon( 'squirtle','assets/img/007.png' );
	var wartortle = new Pokemon( 'wartortle','assets/img/008.png' );
	var blastoise = new Pokemon( 'blastoise','assets/img/009.png' );
	var caterpie = new Pokemon( 'caterpie','assets/img/010.png' );
	var metapod = new Pokemon( 'metapod','assets/img/011.png' );
	var butterfree = new Pokemon( 'butterfree','assets/img/012.png' );

	// Array for all Pokemon
	var pokemonArray 
		= [bulbasaur,ivysaur,venusaur,charmander,charmeleon,charizard,squirtle,wartortle,blastoise,caterpie,metapod,butterfree];

	var randomPokemon, pokemonPath
	var isRight = false;
	var score = 0;
	var didUserClick = false;

	// Picks a random Pokemon
	getRandomPokemon();

	document.getElementById( 'sendPokemon' ).addEventListener( 'click', checkPokemon );

	// Countdown timer
	var losses = 0;
	mainTimer();

	function mainTimer() {
		var counter = 3;
		var timer = setInterval( countDown, 1000 );

		function countDown(){

			console.log( 'isRight test: ' + isRight );

			if ( score === 5 && losses < 3 ) { 
				document.getElementById( 'win' ).play(); 
				clearInterval( timer ); 
				alert( 'You have won!' )
				return; 
			}

			if ( losses === 3 ) { document.getElementById( 'gameOver' ).play(); clearInterval( timer ); return; }

			if ( isRight === false ) {

				if ( counter > 0 && losses < 3) {
					document.getElementById( 'timerdisplay' ).innerHTML = 'Time Remaining:<br>0:0' + counter;
					counter --;
					// If player is unsuccessful or time runs out
				} else if ( counter === 0 && losses < 3 ) {
					document.getElementById( 'timerdisplay' ).innerHTML = 'Time Remaining:<br>0:0' + counter;
					//Plays wrong sound
					document.getElementById( 'wrong' ).play(); 
					losses++;
					clearInterval( timer );
					console.log(isRight);
					repeatCountdown();

					switch ( losses ) {
						case 1: document.getElementById( 'tepig1' ).style.visibility = 'visible'; break;
						case 2: document.getElementById( 'tepig2' ).style.visibility = 'visible'; break;
						case 3: document.getElementById( 'tepig3' ).style.visibility = 'visible'; break;

						default: break;
					}

				} else { return; }

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
				console.log( 'score: ' + score );
				console.log( 'isRight: ' + isRight );


				switch( score ) {
					case 1: document.getElementById( 'pokeball1' ).src = 'assets/img/pokeball.png'; break;
					case 2: document.getElementById( 'pokeball2' ).src = 'assets/img/pokeball.png'; break;
					case 3: document.getElementById( 'pokeball3' ).src = 'assets/img/pokeball.png'; break;
					case 4: document.getElementById( 'pokeball4' ).src = 'assets/img/pokeball.png'; break;
					case 5: document.getElementById( 'pokeball5' ).src = 'assets/img/pokeball.png'; break;
					default: break;

				repeatCountdown();

				}

			} else { 
				document.getElementById( 'wrong' ).play(); 
			}
		didUserClick = true;
	}
	// Picks random Pokemon
	function getRandomPokemon(){

		randomPokemon = parseInt( Math.floor( Math.random() * 12 ) );
		// Path for corresponding image for random Pokemon
		pokemonPath = pokemonArray[randomPokemon]['path'];
		// Displays image of random Pokemon
		document.getElementById( 'pokemonimage' ).setAttribute( 'src',pokemonPath );
	}

});