var app = angular.module("twenty48", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/2048', {
		controller: "twenty48Controller",
		templateUrl: "app/views/2048.html"
	})
	.otherwise({
		redirectTo: "/2048"
	})
});