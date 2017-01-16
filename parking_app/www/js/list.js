angular.module('parking').filter("image", function(baseUrl, port,fileurl){
	return function(input){
		return baseUrl + port + fileurl + '/Parklot/' + input;
	}
}).controller('ListCtrl', function ($cacheFactory,$location,$scope,$http,$state,baseUrl, port, entity) {
  //$scope.user = $scope.currentUser;
	var getrecord = {
	    method:'GET',
	    url:baseUrl+port+entity+'Parkrecord/?Parkrecord.userid='+$scope.user.id+'&Parkrecord.isleave=1',
	    headers: {'Content-Type': 'application/json'},
	    crossDomain: true	    	
	}
	$http(getrecord).then(function(res){
		$scope.lists = res.data.Parkrecord;
		if($scope.lists){
			$scope.lists.forEach(function(list){
			   	var getres = {
				    method:'GET',
				    url:baseUrl+port+entity+'Parklot/'+list.parkid,
				    headers: {'Content-Type': 'application/json'},
				    crossDomain: true
			  	};
			  	$http(getres).then(function(res2){
				    list.parklot = res2.data.name;
				});
			});
		}
	});
});
