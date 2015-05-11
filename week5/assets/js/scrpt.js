$(document).ready(function(){
	// Hides the sad Tepig images
	document.getElementById('tepig1').style.visibility = 'hidden';
	document.getElementById('tepig2').style.visibility = 'hidden';
	document.getElementById('tepig3').style.visibility = 'hidden';

	var pokemonName, path, guess;
	var shownArray = ['test'];
	var dataToPost = {'alreadyShown': shownArray };
	var randomPokemon, pokemonPath;
	var isRight = false;
	var score = 0;
	var didUserClick = false;
	var alreadyChosenPokemon = [];

	document.getElementById( 'sendPokemon' ).addEventListener( 'click', checkPokemon );

	getRandomPokemon();
	mainTimer();

	function getRandomPokemon(){
		$.ajax({
			method: 'POST',
			contentType: 'application/json',
			url: 'http://localhost:8888/pokemon',
			data: JSON.stringify( {'alreadyShown': shownArray } ), 
			success: getPokemonFromServer
		});
	}

	var chosenPokemon; 
	// Gets random pokemon from server that hasn't already been shown
	function getPokemonFromServer( data ){
		pokemonName = JSON.parse(data)['name'];
		path = JSON.parse(data)['path'];
		shownArray.push(pokemonName);
	  document.getElementById( 'pokemonimage' ).setAttribute( 'src', path );
	}

	//Checks if Pokemon entered was right/wrong
	function checkPokemon() {

		guess = document.getElementById('inputPokemon').value.toLowerCase();
		var sendGuessToServer = JSON.stringify({'guess': guess, 'correct': pokemonName });
		console.log('Sending this guess to server: ' + sendGuessToServer);

		$.ajax({
			method: 'POST',
			contentType: 'application/json',
			url: 'http://localhost:8888/guess',
			data: sendGuessToServer, 
			success: checkPokemonOnServer
		});

	}
	//receives response from the server
	//checks if server sent a correct (true) or wrong (false) response
	function checkPokemonOnServer(data){
		console.log(data);
		if ( data === 'true' ) {
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
			//repeats count down sequence
			repeatCountdown();
			}

			} else { 
				document.getElementById( 'wrong' ).play(); 
			}
		didUserClick = true;
	}

	// Counts down again after first countdown
	function repeatCountdown(){
		mainTimer(); 
		getRandomPokemon();
		document.getElementById( 'sendPokemon' ).addEventListener('click', checkPokemon);
		document.getElementById( 'inputPokemon' ).value = '';
	}

	function myModalWin() {
		document.getElementById( 'myDialogWin' ).showModal();
	}

	function myModalLose() {
		document.getElementById( 'myDialogLose' ).showModal();
	}
	// Countdown timer
	var losses = 0;

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

});