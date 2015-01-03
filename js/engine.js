/**
 * AngularJS Controller 
 */
var dictApp = angular.module('dictApp', ['wu.masonry']);
dictApp.controller('dictCtrl', function ($scope, $http){
	$http.get('js/tokipona.json').success(function(data) {
		$scope.cards = data;
	});
});