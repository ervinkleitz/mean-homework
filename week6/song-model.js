var mongoose = require( 'mongoose' ),
		Schema = mongoose.Schema,
		songSchema = new Schema({
			track_name: String,
			artist_name: String,
			popularity: Number,
			time_submitted: String
		}),
		Song = mongoose.model( 'Song', songSchema );

module.exports = Song;