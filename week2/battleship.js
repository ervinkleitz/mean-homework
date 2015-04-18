var ask = require('readline-sync');

console.log( '\n      _~ \n   _~)_)_~\n  )_))_))_)\n  _!__!__!_\n  \\______t/' );
console.log( '~~~~~~~~~~~~~\nBattleship 1.0\n' );
// var 10 = ask.require( 'Enter grid size (eg. 3 for 3x3, 10 for 10x10): ' );

// Object constructor for ships
var shipObject = function (coordinates, ship, hit){
  this.coordinates = coordinates;
  this.hit = hit;
  this.ship = ship;
};
// Method to create ships in the grid. NOTE: Chance is 1:5 to create a ship.
shipObject.prototype.addShip = function(){
  var shipOrNoShip = Math.ceil( Math.random() * 5 );
  if ( shipOrNoShip > 1 ) { this.ship = false; this.ship; }
  else { this.ship = true; this.ship; }
};
// Method to run when trying to hit a ship
shipObject.prototype.hitShip = function( playerInputCoordinates ){
	if ( matrix[playerInputCoordinates]['ship'] === true && matrix[playerInputCoordinates]['hit'] === undefined ) {
		this.hit = true;
		this.hit;
	} else if ( matrix[playerInputCoordinates]['ship'] === true && matrix[playerInputCoordinates]['hit'] === true ) {
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
var pointToProcess;

// While loop will keep looping until: 
// a) correct format is used, b) user wants to stop by pressing 'n'
while ( continueCheck != 'n' ) { 
	// Lets the user know how many ships were created
	console.log( 'There are ' + maxShips + ' pirate ships! \nFind them!\n');
	
	point = ask.question( 'Enter coordinates (x,y): ' ).replace(/\s/g, '');
	pointToProcess = parseInt( point.replace(/,/g, '') );

	console.log(matrix[pointToProcess]['hit']);

	matrix[pointToProcess].hitShip(pointToProcess);

	if ( matrix[pointToProcess]['ship'] === true && matrix[pointToProcess]['hit'] != 'Already hit' ) {
		continueCheck = ask.question ( 'Hit! \nTry again? (Y/N): ' ).toLowerCase().trim();
		maxShips--;
	} else {
		continueCheck = ask.question ( 'Missed! Boo :/ \nTry again? (Y/N): ' ).toLowerCase().trim();	
	}
	console.log(matrix[pointToProcess]);

	console.log( showGrid() );

}

// Function to display Grid reflecting misses and hits
function showGrid () {
	var visualGrid = '';
	for ( index = 0; index < matrix.length; index ++ ) {

		if ( matrix[index]['hit'] === undefined ) { 
			visualGrid +=  'O '; 
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
