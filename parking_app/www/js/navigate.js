angular.module('parking').controller('NavigateCtrl',function ($scope, $http, $state, $timeout,baseUrl, port, entity,$stateParams) {
	var longitude = $stateParams.longitude;
	var latitude = $stateParams.latitude;
	console.log(longitude);
	console.log(latitude)
	var map = new BMap.Map("l-map");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
    baidu_location.getCurrentPosition(function(data){
		$scope.datastr = data.split('\n');
		$scope.latstr = $scope.datastr[2].split(':')
		$scope.longstr = $scope.datastr[3].split(':')
		var p1 = new BMap.Point($scope.longstr[1], $scope.latstr[1]);
		var p2 = new BMap.Point(longitude,latitude);
		var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
		driving.search(p1, p2);
	});


});