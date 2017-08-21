var myApp = angular.module('myApp', ['ngRoute']);
// in order to get the routing functionality we need to add 'ngRoute' module as dependency


/*
* We need to configure our app in order to use the services provide by 'ngRoute' module
* Here we got the '$routeProvider' service which as injected as Dependency
*/
myApp.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController' // this will attach to the corresponding controller
    })
    
    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    });
    
    /*
    * %2F is the percent-encoding for the forward-slash / character.
    * This problem is related to the fact that AngularJS 1.6 has changed the 
    * default for hash-bang urls in the $location service.
    * For reverting that action use the below snippent.
    */
    $locationProvider.hashPrefix('');
});

myApp.controller('mainController', ['$scope', '$log', function ($scope, $log) {
	$log.log("mainController is now incharge");
}]);

myApp.controller('secondController', ['$scope', '$log', function ($scope, $log) {
	$log.log("secondController is now inscharge");
}]);