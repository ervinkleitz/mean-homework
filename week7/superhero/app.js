//***** Author: Ervin Kleitz Gonzales *****//

var app = angular.module( 'myHeroes', ['ui.bootstrap'] );

app.controller( 'myController' , function( $scope, modelManager ){
  $scope.heroes = [];
	$scope.favorites = [];
  $scope.heroObj = {};
	$scope.background = [];
	$scope.show = 1;
	$scope.showFave = 1;
	$scope.showPanel = 0;

  //	calls function that fetches list of Superheroes from Marvel API
  $scope.pullHeroes = function(){
		$scope.showPanel = 2;
	  $scope.heroes = modelManager.getHeroesList();
		$scope.carouselPanel = !$scope.carouselPanel;
  };
	//	gets favorites list
	$scope.pullFavorites = function() {
		$scope.showPanel = 3;
		$scope.favorites = modelManager.getFavoritesList();
		if ( $scope.favorites.length === 0 ) $scope.showPanel = 0;
	};
	
  //	toggles hide/show for Super Hero Panel
  $scope.showAddSuperhero = function(){
		$scope.showPanel = 1;
  };
	//	adds hero to favorites list
  $scope.addHero = function(){
		$scope.favorites = modelManager.addHeroToList($scope.heroObj);
		$scope.heroObj = {};
  };
							
});

