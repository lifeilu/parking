angular.module('parking').controller('LoginCtrl', function ($location,$state, $scope, $http,baseUrl, port, entity) {
  $scope.user = {};
  $scope.login = function() {
    if($scope.user.username==null||$scope.user.password==null){
      alert("用户名密码不能为空");
    }
    else{
      var getres = {
        method:'GET',
        url:baseUrl+port+entity+'user/?User.username='+$scope.user.username+'&User.password='+$scope.user.password,
        headers: {'Content-Type': 'application/json'},
        crossDomain: true
      };
      $http(getres).then(function(res){
        console.log(res.data);
        if(res.data.User==null){
          alert("用户名或密码错误");
        }
        else{
          $scope.currentUser = res.data.User[0];
          console.log($scope.currentUser);
          //coverAuth.setCurrentUser($scope.currentUser);
          localStorage['user'] = JSON.stringify($scope.currentUser);
          // $state.go('main.home');
          $state.go('main.parking');
        }
      });
    }
  }
  $scope.register = function(){
    $state.go('register');
  }

});
