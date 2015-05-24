var app = angular.module( 'myHeroes', ['ui.bootstrap'] );

app.controller( 'myController' , function( $scope, modelManager ){
  $scope.heroes = [];
	$scope.favorites = [];
  $scope.heroObj = {};

  //	calls function that fetches list of Superheroes from Marvel API
  $scope.pullHeroes = function(){
	  $scope.heroes = modelManager.getHeroesList();
  };
	
	//	get list of favorites
	$scope.pullFavorties = function(){
		$scope.favorites = modelManager.getFavoritesList();
	};
	
  //	toggles hide/show for Super Hero Panel
  $scope.showAddSuperhero = function(){
	  $scope.superHeroPanel = !$scope.superHeroPanel;	
  };

  $scope.addHero = function(){
		$scope.favorites = modelManager.addHeroToList($scope.heroObj);
		$scope.heroObj = {};
  };
							
});
