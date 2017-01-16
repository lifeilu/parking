angular.module('parking').controller('SpaceCtrl',function ($scope, $http, $state, $timeout,$cordovaBarcodeScanner,baseUrl, port, entity,$stateParams) {
    var currentUser = localStorage['user'];
    if(currentUser){
      $scope.user = JSON.parse(currentUser);
    }
    $scope.parkid = $stateParams.parkid;
    $scope.spaceid = $stateParams.spaceid;
    $scope.entryid = $stateParams.entryid;
    console.log($scope.parkid);
    console.log($scope.spaceid);
    var getpark = {
        method:'GET',
        url:baseUrl+port+entity+'Parklot/'+$scope.parkid,
        headers: {'Content-Type': 'application/json'},
        crossDomain: true
    };
    $http(getpark).then(function(res){
        $scope.parklot = res.data;
        console.log($scope.parklot);
        var getspace = {
            method:'GET',
            url:baseUrl+port+entity+'Parkspace/'+$scope.spaceid,
            headers: {'Content-Type': 'application/json'},
            crossDomain: true
        };
        $http(getspace).then(function(res2){
            $scope.parkspace = res2.data;
            console.log($scope.parkspace);
            var getallspace = {
                method:'GET',
                url:baseUrl+port+entity+'Parkspace/?Parkspace.parkid='+$scope.parkid+'&Parkspace.isfull=1',
                headers: {'Content-Type': 'application/json'},
                crossDomain: true
            };
            $http(getallspace).then(function(res3){
                $scope.parkspaces = res3.data.Parkspace;
                console.log($scope.parkspaces);
                var getres4 = {
                    method:'GET',
                    url:baseUrl+port+entity+'Parkentry/'+$scope.entryid,
                    headers: {'Content-Type': 'application/json'},
                    crossDomain: true
                };
                $http(getres4).then(function(res4){
                    $scope.parkentry = res4.data;
                    console.log($scope.parkentry);
                    var canvas = document.getElementById("canvas");
                    if (canvas == null)
                        console.log("not exist");
                    var context = canvas.getContext("2d");
                    context.strokeRect(0, 0, 300, 100);
                    var width = 300 / $scope.parklot.ypos;
                    var height = 100 / $scope.parklot.xpos;
                    context.fillStyle = "AntiqueWhite";
                    for(var i = 0;i < $scope.parklot.xpos ;i++){
                        for(var j = 0;j < $scope.parklot.ypos;j++){
                            var flag = 0;
                            for(var k = 0;k<$scope.parkspaces.length;k++){
                                if($scope.parkspaces[k].xpos==i+1&&$scope.parkspaces[k].ypos==j+1){
                                    flag = 1;
                                    context.fillRect((j+0.2)*width, (i+0.2)*height, width*0.6, height*0.6);
                                    break;
                                }
                            }
                            if(flag==0){
                              context.strokeRect((j+0.2)*width, (i+0.2)*height, width*0.6, height*0.6);                
                            }
                        }
                    }
                    context.strokeStyle = "rgb(250,0,0)";
                    context.lineTo(parseInt($scope.parkentry.y)*0.95*width+0.1*width,parseInt($scope.parkentry.x)*0.95*height+0.1*height);
                    context.lineTo(parseInt($scope.parkentry.y)*0.95*width+0.1*width,(parseInt($scope.parkspace.xpos)-0.95)*height);
                    context.lineTo((parseInt($scope.parkspace.ypos)-0.5)*width,(parseInt($scope.parkspace.xpos)-0.95)*height);
                    context.lineTo((parseInt($scope.parkspace.ypos)-0.5)*width,(parseInt($scope.parkspace.xpos)-0.65)*height);
                    context.stroke();                        
                });            
            });            
        });
    });
    $scope.confirm = function(){
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            console.log($scope.spaceid);
            if(imageData.text!=$scope.spaceid){
                console.log(imageData.text);
                alert("请进入指定停车位");
            }
            else{
                var now = new Date();
                var mytime = now.toString();
                console.log(mytime);
                var data = {
                    "entertime": mytime,
                    "userid":$scope.user.id,
                    "parkid":$scope.parkid,
                    "parkspaceid":$scope.spaceid,
                    "isleave":0
                }
                console.log(data);
                var reqAdd = {
                  method: 'POST',
                  url: baseUrl+port+entity+'Parkrecord/',
                  headers: {'Content-Type': 'application/json'},
                  crossDomain: true,
                  data: data
                }
                $http(reqAdd).then(function(res){
                    $scope.parkspace.isfull = 1;
                    var reqPUT = {
                      method: 'PUT',
                      url: baseUrl+port+entity+'Parkspace/'+$scope.spaceid,
                      headers: {'Content-Type': 'application/json'},
                      crossDomain: true,
                      data: JSON.stringify($scope.parkspace)
                    }
                    $http(reqPUT).then(function(res2){
                        alert("停车成功");
                        $state.go('main.parking');
                    });
                })
            }   
        }, function(error) {
            console.log("An error happened -> " + error);
            return;
        });        
    }
});
