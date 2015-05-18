var express = require( 'express' ),
		Song = require( './song-model' ),
		router = express.Router();

module.exports = exports = router;

//get
router.get( '/', function( req, res ){
	res.render( 'home', {title, 'Page Title'} );
});