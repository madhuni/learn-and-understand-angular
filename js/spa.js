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
    $scope.address = "Bangalore India.";

    $scope.person = {
    	name: "Krishna",
    	address: "Paramlok",
        city: "No idea",
        state: "No idea",
        zip: "No idea"
    };
    
    $scope.formattedAddress = function (person) {
        
        return person.address + ", " + person.city;
    };
    
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


/* 
* Using Custom Directives in Angular JS
*
* The name of the directive (in camelCase) will be normalized and 
* looked into the HTML for its Normalized version
*
* 'replace' property of the directive object is use to be 'false' by default
* This property will totally remove the custom directive in the HTMl and 
* will replace that with the HTML defined in 'template' property. Otherwise
* is use to add the 'tempalate' html as a child of the directive.
* 
* 'restrict' property can be use to control the custom directive so that it
* can allow any one or combination of a specific 'directive declaration style'
* which can be replaced by the template HTML in the DOM. It can be the combination
* of 'EACM' {E-element, A-attribute, C-class, M-comment}
* 
* 'template' property which is the string of the HTML, can be very large and
* complex
* to maintain so Angular JS provide us new method of defining the template HTML in
* different ways. Insted of using the tempate string, we use a 'templateUrl'
* property and there we can mention the URL of the HTML file which we can make
* separately in any folder.
* 
* 'scope' property is going to isolate the scope of the view of custom directive from the
* scope of the mainController. This will also give the view it's own model by isolating
* it from the parent's model (scope). This process is preventing us to accedently touching
* the scope in the controller.
* But in case if we need to access the model of the parent (mainController) then we can do it
* by using 'custom Attributes' in the main HTML page where we declared our directives.
* 
* meaning of symbols:
* @ --> Text
* = --> Two-way-binding (Not just the text, we can pass an Object as well)
* & --> a funciton
*/

myApp.directive('searchResult', function () {
    return {
        restrict: "EACM",
        /*template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">{{ name }}</h4><p class="list-group-item-text">Bangalore, India.</p></a>',*/
        templateUrl: "directives/search_results.html",
        replace: true,
        scope: {
        	/* 
        	* We can still poke holes into the insolated scope through the special
        	* keywords provided by Angular JS 
        	*/
            personName: "@",
            personAddress: "@",
            personObject: "=",
            formattedAddress: "&"
        }
    }
});