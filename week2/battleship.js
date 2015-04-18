var ask = require('readline-sync');

console.log( '\nFind the Death Star (2D) 1.0\nCaptain - help us locate the Deathstar!' );

// Loop to accept correct input from user
var point = ' ';
// While loop will keep looping until correct format is entered
// at the same time removing all white space
while( point.length != 3 && point.indexOf(',') === -1 ) {
	console.log( '----------------------\nEnter x and y Coordinates (from 0 to 9)' )
	point = ask.question( 'Use comma to separate coordinates: ' ).replace(/\s/g, '');
}
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

// Matrix creation for grid
var matrix = [];
// x = x-coordinate
for ( var x = 0; x < 3; x++ ) {
	// y = y-coordinate
	for ( var y = 0; y < 3; y++ ) {
				// Saves the coordinates for each point to the location property
				// in the grid
	    	var z = new shipObject (x + ',' + y, false, undefined);
        	matrix.push(z);
	    }
	}
// Code to create at least 3 ships
var maxShips = 0;
while (maxShips < 3 ) {
	for ( var index = 0; index < matrix.length; index++ ) {
	      matrix[index].addShip();

	      if (matrix[index]['ship'] === true ) {
	      	maxShips++;	
	        } else {
	        	break;
	        }
	    }
	}
