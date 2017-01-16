angular.module('parking').controller('MainCtrl', function ($cacheFactory,$location,$scope,$http,$state) {
    var currentUser = localStorage['user'];
    if(currentUser){
      $scope.user = JSON.parse(currentUser);
    }
});
