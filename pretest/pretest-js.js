var firstName = 'Ervin Kleitz', lastName = 'Gonzales';

console.log(lastName + ', ' + firstName);

for (var i = 1; i <= 15; i++ ) {
	console.log(i + '*');
}

var person = {
		name: 'Susan',
		age: 28,
		height: '5’ 11”',
		hometown: 'Chicago, Illinois'
}

for (var index in person) {
	console.log(index + ': ' + person[index]);
}