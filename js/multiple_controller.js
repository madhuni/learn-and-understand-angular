var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
	$scope.name = "Kanishka";
}]);

myApp.controller('secondController', ['$scope', function($scope) {
	$scope.name = "Madhuni";
}]);


/*
* we can use the fragment indentifier for our own purpose and can do multiple things
* whatever we want to do. 
* This is the base concept of the Single Page Applications.
*/

/*
* Single Page Application
* 
* A SPA is one where you officially download, have the browser do a complete
* request for this HTML once. SO when you look at the URL it just one page and
* then we use AJAX to get the things behind the seen and can specify what it should
* go get using the Fragment Identifier and in JS we can do whatever we want
* based on those 'fake URLs'.
*/
window.addEventListener('hashchange', function() {
	// console.log("Hash has been changed!" + window.location.hash);

	if (window.location.hash === "#/bookmark/1") {
		console.log("page 1 is cool");
	}

	if (window.location.hash === "#/bookmark/2") {
		console.log("page 2 is cool");
	}

	if (window.location.hash === "#/bookmark/3") {
		console.log("page 3 is cool");
	}
});