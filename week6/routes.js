//Author: Ervin Kleitz Gonzales//
//*****************************//

var express = require( 'express' ),
		Song = require( './song-model' ),
		router = express.Router();

module.exports = exports = router;

//home page, takes new song submission
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
	Song.find( {}, function( err, data ){
		var songList = [];
		//creates an array of the 20 newest tracks and places them in songList
		for ( var i = 0; i < 20; i++ ) {
			songList.push({
				name: data[i].track_name,
				artist: data[i].artist_name,
				popularity: data[i].popularity,
				date_submitted: data[i].time_submitted
			});
		} //end of for loop
		//sorts array by date_submitted
		songList = songList.sort( sortByDate );
		res.render( 'list', {title: 'Newest', tracks: songList});
	});
});

//displays songs in order of popularity
router.get( '/popular', function( req, res, next ){
	Song.find( {}, function( err, data ){
		var popularList = [];
		//creates an array of the top 20 most popular songs
		for ( var i = 0; i < 20; i++ ) {
			popularList.push({
				name: data[i].track_name,
				artist: data[i].artist_name,
				popularity: data[i].popularity,
				date_submitted: data[i].time_submitted
			});
		}//end of for loop
		popularList = popularList.sort( sortByPopularity );
		res.render( 'list', {title: 'Popular', tracks: popularList});
	});
});

//displays random song
router.get( '/random', function ( req, res, next ) {
	Song.find( {}, function ( err, data ) {
		var randomSongIndex = Math.floor( Math.random() * data.length );
		var randomSong = data[ randomSongIndex ];
		res.render( 'single', {
			title: 'Random', 
			track: randomSong.track_name,
			artist: randomSong.artist_name,
			popularity: randomSong.popularity
		});
	});
});

//*********************//
//***** functions *****//
//*********************//

function sortByDate( a, b ) { 
    return new Date( b.date_submitted ).getTime() - new Date( a.date_submitted ).getTime() 
}

function sortByPopularity (a, b){
  return b.popularity - a.popularity
}