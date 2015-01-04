/**
 * AngularJS Controller 
 */
var dictApp = angular.module('dictApp', ['wu.masonry']);
dictApp.controller('dictCtrl', function ($scope, $http){
	$http.get('js/tokipona.json').success(function(data) {
		$scope.cards = data;
	});
});


var aboutApp = angular.module('aboutApp', []);
aboutApp.controller('aboutCtrl', function ($scope, $http){
	$http.get('js/tokipona.json').success(function(data) {
		$scope.cards = data;
	});
	//$scope.pic = $scope.cards[Math.floor(Math.random() * 121)]["image"];
});
