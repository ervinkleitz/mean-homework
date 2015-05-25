app.service( 'modelManager', function( heroService ){

	this.getHeroesList = function(){
		return heroService.getHeroes();
	};
	//	adds input to favorites list in heroService
	this.addHeroToList = function(obj){
		if ( this.validator(obj) ) heroService.addFavorite(obj);
		
	};
	//	validates input if user has filled out the fields
	this.validator = function(obj){
		if ( obj.name && obj.description && obj.imgPath && obj.videoPath && obj.userName ) return true;
		else alert('Please fill out all the fields.');
	};
	
	this.getFavoritesList = function(){
		return heroService.getFavorites();
	};
		
});