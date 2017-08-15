/* Here we have created a angualar module and that is my "app" in global namespace 
* Now here is only one object in the Golbal Namespace and that is an Angular Module.
* 
*/
var myApp = angular.module('myApp', []); // the array use to have list of dependecy modules

myApp.controller('mainController', function ($scope, $log, $timeout, $filter) {

    /* 
     * "$scope" is the service provided by angular js. 
     * We are doing the dependency injection by passing the '$scope' in 
     * the function. 
     * Angular will read the name of service and will provide the corresponding
     * object.
     */
 
    $scope.name = "Kanishka";
    $scope.lastName = "Madhuni";

    $timeout(function () {
        $scope.name = "Tejas";

    }, 3000);

    $scope.handle = "";
    $scope.lowercaseHandle = function () {
        return $filter('lowercase')($scope.handle);
    };
    
    /* 
    * Angular use to add wacher list which contains all the variables and
    * functions which got changed or may get changed when a event is thrown.
    * Angular use to keep track of all the items in the watcher list and 
    * runs the "Digest Cycle" to see if any of the item in the list got changed,
    * it use to update the current new value wherever it's reflecting in the
    * Model or View.
    * In the below example we have manually added the 'handle' variable to the
    * watcher list, and whenever the value of the "handle" get changed, it use
    * to run the "Digest Cycle" and will show the old and new value of the
    * "handle" variable. (Angular do this automatically for us and all these
    * happens in the "Angular Context")
    */
    
    $scope.$watch('handle', function (newVal, oldVal) {
        console.info("Digest cycle runs!");
        console.log("Old value was : " + oldVal);
        console.log("New vlaue is : " + newVal);
    });
    
    /*
    * In the below example we are using the native javascript "setTimeout" 
    * function to change the value of the $scope.handle variable after 3s.
    * 
    * But on running the code without using the $apply method, the code 
    * will be running outside of the "Angular Context" so angular will not
    * be looking for the changes occur and will not update the VIEW and MODEL
    * with the new value (i.e. It will not run the "Digest Cycle").
    * 
    * So in order to make all the changes happen, we will have to notify the
    * Angular that hey we are running this code, it might change the things,
    * kinldy add this to your watcher list and run the Digest cycle to
    * reflect the changes what we are doing here outside of the Angular Context.
    */
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.handle = "new handle";
            console.log("handle got changed!");
        }, 3000);
    });

});