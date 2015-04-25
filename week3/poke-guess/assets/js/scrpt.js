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
	
	// Function to pick a random Pokemon
	var randomPokemon;
	var pokemonPath;
	function getRandomPokemon(){

		randomPokemon = parseInt( Math.floor( Math.random() * 12 ) );
		// Path for corresponding image for random Pokemon
		pokemonPath = pokemonArray[randomPokemon]['path'];
		// Displays image of random Pokemon
		document.getElementById('pokemonimage').setAttribute('src',pokemonPath);
	}

	// Picks a random Pokemon
	getRandomPokemon();

	// Accepts user input and plays sound if it matches random Pokemon name within 10 seconds
	var userPokemonToCheck = '';
	var didUserClick = false;
	var checkPokemon = function(){

		userPokemonToCheck = document.getElementById('inputPokemon').value.toLowerCase();

			if ( userPokemonToCheck === pokemonArray[randomPokemon]['name'] && counter > 0 ) {
				document.getElementById('correct').play();

			} else {
				document.getElementById('wrong').play();
			}

		didUserClick = true;
	};

	document.getElementById( 'sendPokemon' ).addEventListener('click', checkPokemon);

	// Countdown timer
	var losses = 0;
	var counter = 9;
	var timer = setInterval( countDown, 1000 );
	function countDown(){

		if ( counter > 0 ) {
			document.getElementById( 'timerdisplay' ).innerHTML = 'Time Remaining:<br>0:0' + counter;
			counter --;

		} else {
			document.getElementById( 'timerdisplay' ).innerHTML = 'Time Remaining:<br>0:0' + counter;
			clearInterval( timer );
			document.getElementById('wrong').play();
			losses++;
			getRandomPokemon();
			document.getElementById( 'inputPokemon' ).value = '';

			switch ( losses ) {
				case 1: document.getElementById('tepig1').style.visibility = 'visible'; break;
				case 2: document.getElementById('tepig2').style.visibility = 'visible'; break;
				case 3: document.getElementById('tepig3').style.visibility = 'visible'; break;

				default: break;
			}

		}
	};



});