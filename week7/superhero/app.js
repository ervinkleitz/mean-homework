//***** Author: Ervin Kleitz Gonzales *****//

var app = angular.module( 'myHeroes', ['ui.bootstrap'] );

app.controller( 'myController' , function( $scope, modelManager, $modal ){
  $scope.heroes = [];
	$scope.favorites = [];
  $scope.heroObj = {};
	$scope.show = 1;
	$scope.showFave = 1;
	$scope.showPanel = 0;
	$scope.animationsEnabled = true;
	$scope.links = [];

  //	calls function that fetches list of Superheroes from Marvel.com
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
	//	modal
	$scope.open = function (index) {
		//	saves current instance's video data in $scope.link
		$scope.link = modelManager.getFavoritesList()[index].videoPath[0].path;
		console.log($scope.link);
		
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			size: 'md',
			resolve: {
				url: function () {
					return $scope.link;
				}
			}
		});
	};
	
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, url, $sce) {
	$scope.path = $sce.trustAsResourceUrl(url.replace('watch?v=', 'embed/'));
	console.log('url: ' + $scope.path);
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

