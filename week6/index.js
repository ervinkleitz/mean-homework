var express = require( 'express' ),
	app = express(),
	bodyParser = require( 'body-parser' ),
	PORT = process.env.PORT || 8080,
	routes = require( './routes' ),
	mongoose = require( 'mongoose' ),
	expressHandlebars = require( 'express-handlebars' );

mongoose.connect( 'mongodb://localhost/favorite-song' );
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));  
app.set('view engine', 'handlebars'); 

//***** middleware *****//
app.use(express.static(__dirname + '/www'));
app.use( bodyParser.json() );
app.use( '/favorite-song', routes );
//error handling
app.use( function ( req, res, next ) {
	if ( req.error ){
		switch ( req.error ) {
				case 'NOT FOUND':
						res.send( 'Song ' + req.params.id + ' not found.' );
						break;
				default:
						res.send( 500 );
		};
	} else {
			res.send( 'Invalid request' );
	}
});

app.engine( 'handlebars', expressHandlebars({ defaultLayout: 'main'}));
app.set( 'view engine', 'handlebars' );

app.listen( PORT );
console.log( 'Listening on port ' + PORT );