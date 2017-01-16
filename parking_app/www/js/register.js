angular.module('parking').controller('RegisterCtrl', function ($location,$state, $scope, $http,baseUrl, port, entity) {
  $scope.user = {};
  $scope.register = function() {
    console.log($scope.user);
    $scope.user.money = 0;
    var reqAdd = {
      method: 'POST',
      url: baseUrl+port+entity+'user/',
      headers: {'Content-Type': 'application/json'},
      crossDomain: true,
      data: JSON.stringify($scope.user)
    };
    $http(reqAdd).then(function(res){
      console.log(res);
    	alert("注册成功");
      $state.go('login');
    });
  };
  $scope.returnback = function(){
    $state.go('login');
  }
});
