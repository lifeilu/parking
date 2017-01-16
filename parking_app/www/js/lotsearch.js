angular.module('parking').filter("image", function(baseUrl, port,entity){
	return function(input){
		return baseUrl + port + fileurl + '/Parklot/' + input;
	}
}).controller('LotSearchCtrl',function ($scope, $http, $state, $timeout,$cordovaBarcodeScanner,baseUrl, port, entity) {
	var currentUser = localStorage['user'];
    if(currentUser){
      $scope.user = JSON.parse(currentUser);
    }
  	function sortArray(a,b){
  		return a.distance-b.distance;
  	}
  	$scope.click = 1;
	function getdistance (point1,point2){
		var map = new BMap.Map("hidemap");
		var pointA = new BMap.Point(point1.longitude,point1.latitude); 
		var pointB = new BMap.Point(point2.longitude,point2.latitude); 
		return map.getDistance(pointA,pointB).toFixed(2); 
	} 

	$scope.tirarFoto = function(){
		$scope.click = 0;
		var map = new BMap.Map("hidemap");
		var point = new BMap.Point(116.331398,39.897445);
		map.centerAndZoom(point,12);

    	baidu_location.getCurrentPosition(function(data){
				$scope.datastr = data.split('\n');
				$scope.latstr = $scope.datastr[2].split(':')
				$scope.longstr = $scope.datastr[3].split(':')
		       	var mypoint = {
		       		longitude:$scope.longstr[1],
		       		latitude:$scope.latstr[1]
		       	}
		       	var getres = {
					method:'GET',
					url:baseUrl+port+entity+'Parklot/',
					headers: {'Content-Type': 'application/json'},
					crossDomain: true
				};
			  	$http(getres).then(function(res){
			  		console.log(res);
			  		$scope.parklot = res.data.Parklot;
			  		$scope.parklot.forEach(function(lot){
			  			var point = {
				  			longitude:lot.longitude,
				  			latitude:lot.latitude
				  		}
				  		lot.distance = getdistance(point,mypoint);
			  		})
			  		console.log($scope.parklot);
			  		$scope.parklot.sort(sortArray);
			  		console.log($scope.parklot);
			  		$scope.parkings = $scope.parklot.slice(0,5);
			  	});
	    }, function(err){
	      alert("错误："+err)
	    });
    };
    $scope.returnback = function(){
    	$state.go('main.parking');
    };
    $scope.gospace = function(){
    	$state.go('spacenavi');
    };
});