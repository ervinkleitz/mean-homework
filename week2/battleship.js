var ask = require('readline-sync');
// Welcome message for fun :) 
console.log( '\n      _~ \n   _~)_)_~\n  )_))_))_)\n  _!__!__!_\n  \\______t/' );
console.log( '~~~~~~~~~~~~~\nPirateship 1.0' );

// Object constructor for ships
var shipObject = function (coordinates, ship, hit){
  this.coordinates = coordinates;
  this.hit = hit;
  this.ship = ship;
};
// Method to create ships in the grid. NOTE: Chance is 1:5 to create a ship.
shipObject.prototype.addShip = function() {
  var shipOrNoShip = Math.ceil( Math.random() * 5 );
  if ( shipOrNoShip > 1 ) { this.ship = false; this.ship; }
  else { this.ship = true; this.ship; }
};
// Method to run when trying to hit a ship
shipObject.prototype.hitShip = function( playerInputCoordinates ){
	if ( matrix[playerInputCoordinates]['ship'] === true && matrix[playerInputCoordinates]['hit'] === undefined ) {
		this.hit = true;
		this.hit;
	} else if ( matrix[playerInputCoordinates]['hit'] === true ) {
		this.hit = 'Already hit';
		this.hit;
	} else {
		this.hit = false;
		this.hit;
	}
};
// Matrix creation for grid
var matrix = [];
// x = x-coordinate
for ( var x = 0; x < 10; x++ ) {
	// y = y-coordinate
	for ( var y = 0; y < 10; y++ ) {
				// Saves the coordinates for each point to the 
				// location property in the grid 
	    	var z = new shipObject (x + ',' + y, false, undefined);
        	matrix.push(z);
	    }
	}
// Code to create at least 3 ships
var maxShips = 0;
while (maxShips < 3 ) {
	maxShips = 0;
	// Loop to apply the addShip method for each point in the grid
	for ( var index = 0; index < matrix.length; index++ ) {
	      matrix[index].addShip();
	      // If ship was created, increment maxShips
	      if (matrix[index]['ship'] === true ) {
	      	maxShips++;	
	        } 
	    }
	}

// Loop to accept correct input from user
var point = '0';
var continueCheck = 'y';
var pointToHit;

// While loop will keep looping until: 
// a) correct format is used, b) user wants to stop by pressing 'n'
while ( continueCheck != 'n' && maxShips > 0) { 
	// Lets the user know how many ships were created or are left
	console.log( '\nPirate ships detected: ' + maxShips + ' \nFind the Pirate Armada!\n');
	// Asks player for coordinates in format x,y
	point = ask.question( 'Enter coordinates (x,y): ' ).replace(/\s/g, '');
	pointToHit = parseInt( point.replace(/,/g, '') );
	// 'Hits' point and check if ship is present
	matrix[pointToHit].hitShip(pointToHit);
	// Checks if player hits or misses
		if ( matrix[pointToHit]['ship'] === true && matrix[pointToHit]['hit'] != 'Already hit' ) {
			continueCheck = 
				ask.question ( 'Got \'em! \n\nTry again? (Y/N): ' ).toLowerCase().trim();
			maxShips--;
		} else if ( matrix[pointToHit]['ship'] === true && matrix[pointToHit]['hit'] === 'Already hit' ) {
			continueCheck = 
				ask.question ( 'You already tried that spot! \n\nTry again? (Y/N): ' ).toLowerCase().trim();
		} else {
			continueCheck = 
				ask.question ( 'Missed! Slippery scum! \n\nTry again? (Y/N): ' ).toLowerCase().trim();	
		}
	// Gives player the option to display map
	var getVisualGrid = ask.question( 'Check clues (show map)? (Y/N)' ).toLowerCase().trim();
	if ( getVisualGrid != 'n' ) { 
		console.log( '\n' + showGrid() ); 
		console.log( '\n* Priate Legend: M = Miss, X = Hit, 0 = unknown' );
	}

	// Display congratulatory message when there are no ships
	if (maxShips === 0) console.log( '\nNO MORE PIRATE SCUM!' );	
}

// Function to display Grid reflecting misses and hits
function showGrid () {
	var visualGrid = '';
	for ( index = 0; index < matrix.length; index ++ ) {

		if ( matrix[index]['hit'] === undefined ) { 
			visualGrid +=  '0 '; 
		} else if ( matrix[index]['hit'] === true ) {
			visualGrid += 'X ';
		} else {
			visualGrid += 'M ';
		}
		if ( ( index + 1 ) % 10 === 0 && ( index + 1 ) != matrix.length ) { 
			visualGrid += '\n'; 
			}
		}
		
	return visualGrid;
}
