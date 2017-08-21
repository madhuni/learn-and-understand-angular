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

/*
* Creating our own service (That will be Singleton - remember the concept)
*
* I can use my service like any other service using the DI
*/

myApp.service('myService', function () {
    
    var self = this;
    
    this.name = "Kanishka Mohan Madhuni";
    
    this.nameLength = function () {
        return self.name.length;
    };
});

/*
* All services in the Angular JS are "SINGLETONS"
* Singleton: There will be one & only one copy of an object.
*/
myApp.controller('mainController', ['$scope', '$log', 'myService', function ($scope, $log, myService) {
	$log.log("mainController is now incharge");
    
    // $scope.name = "Main";
    
    /* Using the custom services */
    $scope.name = myService.name;
    
    /* Here we have manually added the watcher for the 'name' property of the $scope 
    * So it will update the value of 'name' property whenever it will change and
    * accordingly will update the value of 'name' property in myService object.
    * Now all the things on both pages will be in sync.
    */
    $scope.$watch('name', function () {
        myService.name = $scope.name;
    });
    
    // Understanding the concept of Singleton
    
    // $log.name = "this is attached to log";
    // console.log($log);
    
    $log.log("My name is " + myService.name);
}]);

myApp.controller('secondController', ['$scope', '$log', 'myService', function ($scope, $log, myService) {
	$log.log("secondController is now inscharge");
    
    // $scope.name = "Second";
    
    $scope.name = myService.name;
    
    /* Adding the watch in the second controller as well */
    $scope.$watch('name', function () {
        myService.name = $scope.name;
    });
    
    // $log.age = 24;
    // console.log($log);
    
    $log.log("Length of my name is " + myService.nameLength());
}]);