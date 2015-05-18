var express = require( 'express' ),
		Song = require( './song-model' ),
		router = express.Router();

module.exports = exports = router;

//get
router.get( '/', function( req, res, next ){
	res.render( 'home', {title: 'Home'} );
});

//adds new track/artist if not present in database
//if present, increases popularity
router.post( '/tracks', function( req, res, next ){
	Song.findOne( {track_name: req.body.track_name, artist_name: req.body.artist_name} , function( err, data ){
		//error handling
		if (err) {
			res.error = err;
			next();
		}
		//if song with the right artist isn't found
		if ( !data ) {
			var song = new Song();
			song.track_name = req.body.track_name;
			song.artist_name = req.body.artist_name;
			song.popularity = 1;
			song.time_submitted = new Date();
			//server side logging
			console.log( 'Song data added: \n' + song );
			//saves new song
			song.save( function( err, newSong ){
				res.send( newSong );
			});
		} else {
			//If song instance is present, increment popularity and logs date
			data.popularity++;
			data.time_submitted = new Date();
			console.log( 'Song data added: \n' + data );
			data.save( function(err, data){
				res.send( data );
			});
		}
	});		
});

//displays newest songs
router.get( '/newest', function( req, res, next ){
//	res.render( 'list', {title: 'Newest'} );
	Song.find( {}, function( err, data ){
		var songList = [];
		for ( var i = 0; i < data.length; i++ ){
			songList.push({
				name: data[i].track_name,
				artist: data[i].artist_name,
				popularity: data[i].popularity,
				date_submitted: data[i].time_submitted
			});
		}
		songList = songList.sort(sortByDate);
		console.log(songList);
		res.render( 'list', {title: 'Newest', tracks: songList});
	});
	
});

//***** functions *****//
function sortByDate( a, b ) { 
    return new Date( b.date_submitted ).getTime() - new Date( a.date_submitted ).getTime() 
}