app.service( 'modelManager', function( heroService ){
	//gets heroes list via Marvel API
	this.getHeroesList = function(){
		return heroService.getHeroes();
	};
	//	adds input to favorites list in heroService
	this.addHeroToList = function(obj){
		if ( this.validator(obj) ) heroService.addFavorite(obj);
		else return null;
	};
	//	validates input if user has filled out the fields
	this.validator = function(obj){
		if ( obj.name && obj.description && obj.imgPath && obj.videoPath && obj.userName ) return true;
		else {
//			alert('Please fill out all the fields.');
			return null;
		}
	};
	//	gets favorites array
	this.getFavoritesList = function(){
		return heroService.getFavorites();
	};
		
});