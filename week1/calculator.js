var readlineSync = require('readline-sync');

var input = readlineSync.question('Please enter your operation: ').trim();

var output, a, b, operatorIndex;

// Addition
if ( input.indexOf('+') != -1 ) {

	operatorIndex = input.indexOf('+');

	a = parseInt( input.substring(0, operatorIndex) );
	b = parseInt( input.substring( operatorIndex + 1, input.length ) );
	console.log( a + b );
}
// Subtraction
if ( input.indexOf('-') != -1 ) {

	operatorIndex = input.indexOf('-');

	a = parseInt( input.substring(0, operatorIndex) );
	b = parseInt( input.substring( operatorIndex + 1, input.length ) );
	console.log( a - b );
}
// Division
else if ( input.indexOf('/') != -1 ) {

	operatorIndex = input.indexOf('/');

	a = parseInt( input.substring(0, operatorIndex) );
	b = parseInt( input.substring( operatorIndex + 1, input.length ) );
	console.log( a / b );
}
// Multiplication
 else if ( input.indexOf('*') != -1 ) {

	operatorIndex = input.indexOf('*');

	a = parseInt( input.substring(0, operatorIndex) );
	b = parseInt( input.substring( operatorIndex + 1, input.length ) );
	console.log( a * b );
}
// Modulo
else if ( input.indexOf('%') != -1 ) {

	operatorIndex = input.indexOf('%');

	a = parseInt( input.substring(0, operatorIndex) );
	b = parseInt( input.substring( operatorIndex + 1, input.length ) );
	console.log( a % b );

} else {
	console.log( 'No operator detected. Ending.' )
}