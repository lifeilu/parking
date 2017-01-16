angular.module('parking')
    .controller('HomeCtrl',
        function ($scope, $http, $state, $timeout,$ionicPopup,baseUrl, port, entity) {
            console.log($scope.user);
            $scope.save = function(){
                var reqAdd = {
                  method: 'PUT',
                  url: baseUrl+port+entity+'user/'+$scope.user.id,
                  headers: {'Content-Type': 'application/json'},
                  crossDomain: true,
                  data: JSON.stringify($scope.user)
                };
                $http(reqAdd).then(function(res){
                    console.log(res);
                    $scope.user = res.data;
                    localStorage['user'] = JSON.stringify($scope.user);
                    alert("修改成功");
                });
            }
            $scope.logout = function(){
                delete localStorage['user'];
                $scope.user = null;
                $state.go('login');
            }
            $scope.charge = function($event){
                $event.stopPropagation();
                $scope.data = {};
                var myPopup = $ionicPopup.show({
                    template: '<input type="number" ng-model="data.money">',
                    title: '请输入充值金额',
                    scope: $scope,
                    buttons: [
                        { text: '取消'},
                        {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!$scope.data.money) {
                                 //不允许用户关闭，除非他键入wifi密码
                                    e.preventDefault();
                                } else {
                                return $scope.data.money;
                                }
                            }
                        },
                    ]
                });
                myPopup.then(function(res) {
                    console.log('Tapped!', res);
                    if(res!=null){
                        $scope.user.money += res;
                        var reqAdd = {
                          method: 'PUT',
                          url: baseUrl+port+entity+'user/'+$scope.user.id,
                          headers: {'Content-Type': 'application/json'},
                          crossDomain: true,
                          data: JSON.stringify($scope.user)
                        };
                        $http(reqAdd).then(function(res){
                            console.log(res);
                            $scope.user = res.data;
                            localStorage['user'] = JSON.stringify($scope.user);
                            alert("充值成功");
                            $state.reload();
                        });
                    }
                });
            }
        });

