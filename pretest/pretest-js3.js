var person = {
		name: 'Susan',
		age: 28,
		height: '5’ 11”',
		hometown: 'Chicago, Illinois'
}

for (var index in person) {
	console.log(index + ': ' + person[index]);
}