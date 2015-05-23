app.service( 'heroService', function(){
	var heroes = [];
	
	this.getHeroes = function(){
		this.pullFromMarvel();
		return heroes;
	};
	
	//fetches list of Avengers superheroes from Marvel API
	this.pullFromMarvel = function(){
			$.get( 'http://gateway.marvel.com//v1/public/characters?events=310&limit=50&ts=2015-04-29T14:18:17-2226&apikey=540afac4e2acd368fbb6a3a316a6bdda&hash=0d1c150c71ec3232cc520da57ab975a9', function( data ){

			var heroArray = data.data.results;

			heroArray.forEach(function(hero){
				var inf = {};
				inf.description = hero.description;
				inf.name = hero.name;
				if (hero.thumbnail)
					inf.img = hero.thumbnail.path + '.' + hero.thumbnail.extension;
				heroes.push( inf );
			});
		});	
	};
	//end of getHeroes
	
});
