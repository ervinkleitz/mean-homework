var app = angular.module( 'myHeroes', ['ui.bootstrap'] );

app.controller( 'myController' , function( $scope, heroService ){
	$scope.heroes = [];
	$scope.superHeroPanel = 0;
	
	//calls function that fetches list of Superheroes from Marvel API
	$scope.pullHeroes = function(){
		$scope.heroes = heroService.getHeroes();
	};
	//end of pullHeroes
	
	//toggles hide/show for Super Hero Panel
	$scope.showAddSuperhero = function(){
		$scope.superHeroPanel = !$scope.superHeroPanel;	
	};

							
});

