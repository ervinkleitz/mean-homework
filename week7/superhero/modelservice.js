app.service( 'heroService', function( $http ){
	var heroes = [];
	var favorites = [];
	
	this.getHeroes = function(){
		this.pullFromMarvel();
		return heroes;
	};
	
	this.getFavoritesList = function(){
		console.log(favorites);
		return favorites;
	};
	
	//	fetches list of Avengers superheroes from Marvel API
	this.pullFromMarvel = function(){
	  $http.get( 'http://gateway.marvel.com//v1/public/characters?events=310&limit=50&ts=2015-04-29T14:18:17-2226&apikey=540afac4e2acd368fbb6a3a316a6bdda&hash=0d1c150c71ec3232cc520da57ab975a9'). 
	  success( function( data ){

			var heroArray = data.data.results;
			heroArray.forEach( function( hero ){
				var obj = {};
				if ( hero.description && hero.name && hero.thumbnail){
					obj.description = hero.description;
					obj.name = hero.name;
					obj.img = hero.thumbnail.path + '.' + hero.thumbnail.extension;
					heroes.push( obj );
					console.log('test');
				}
			});
	  });
	};
	//	end of getHeroes
	
	this.addFavorite = function(obj){
		favorites.push(obj);
		this.getFavoritesList();
	};
	
});
