app.service( 'heroService', function( $http ){
	var heroes = [];
	var favorites = [];
	
	this.getHeroes = function(){
		this.pullFromMarvel();
		return heroes;
	};
	
	this.getFavorites = function(){
		if ( favorites.length === 0) return null;
		return favorites;
	};
	
	//	fetches list of Avengers superheroes from Marvel API
	this.pullFromMarvel = function(){
	  $http.get( 'http://gateway.marvel.com//v1/public/characters?modifiedSince=01-01-1980&limit=100&ts=2015-04-29T14:18:17-2226&apikey=540afac4e2acd368fbb6a3a316a6bdda&hash=0d1c150c71ec3232cc520da57ab975a9'). 
	  success( function( data ){
			var heroArray = data.data.results;
			heroArray.forEach( function( hero ){
				var obj = {};
				//	checks if properties are null or if image is not available
				//	and ignores them
				if ( hero.comics && hero.name && hero.thumbnail && hero.thumbnail.path.indexOf('image_not_available') === -1) {
					obj.description = hero.description;
					obj.name = hero.name;
					obj.img = hero.thumbnail.path + '.' + hero.thumbnail.extension;
					obj.comics = hero.comics.items;
					obj.series = hero.series.items;
					heroes.push( obj );
				}
			});
	  });
	};
	//	end of getHeroes
	//	adds hero to favorites array
	this.addFavorite = function( obj ){
		var newVideoPath = [];
		var num = 1;
		obj.videoPath = obj.videoPath.split(',');
		obj.videoPath.forEach( function( video ) {
			var newVideoPathObj = { path: video, position: num };
			num++;
			newVideoPath.push(newVideoPathObj);
		});
		obj.videoPath = newVideoPath;
		favorites.push(obj);
		console.log(favorites);
	};
	
});
