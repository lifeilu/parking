angular.module('parking').filter("image", function(baseUrl, port,fileurl){
	return function(input){
		return baseUrl + port + fileurl + '/Parklot/' + input;
	}
}).controller('LotDetailCtrl',function ($scope, $http, $state, $timeout,baseUrl, port, entity,$stateParams) {
	$scope.parkid = $stateParams.data;
	var currentUser = localStorage['user'];
    if(currentUser){
      $scope.user = JSON.parse(currentUser);
    }
  	$scope.returnback = function(){
    	$state.go('lotsearch');
    };
   	var getlot = {
	    method:'GET',
	    url:baseUrl+port+entity+'Parklot/'+$scope.parkid,
	    headers: {'Content-Type': 'application/json'},
	    crossDomain: true
  	};
  	$http(getlot).then(function(lot){
  		console.log(lot);
	    $scope.parking = lot.data;
	});
});