var matrix = [];
for ( i = 0; i < 5; i++ ) {
	var line = [];
	for ( var j = 0; j < 5; j++ ) {
		line.push([i,j]);
	}
	matrix.push(line);
}
console.log(matrix[0]);