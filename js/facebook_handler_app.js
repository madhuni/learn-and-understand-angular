/* Here we have created a angualar module and that is my "app" in global namespace */
var myApp = angular.module('myApp', []); // the array use to have list of dependecy modules

myApp.controller('mainController', ['$scope', '$log', '$timeout', '$filter', function ($scope, $log, $timeout, $filter) {
    
    $scope.handle = "";
    $scope.lowercaseHandle = function () {
        return $filter('lowercase')($scope.handle);
    };
    
    
}]);