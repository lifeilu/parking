angular.module('parking').filter("image", function(baseUrl, port,fileurl){
	return function(input){
		return baseUrl + port + fileurl + '/Parklot/' + input;
	}
}).controller('LeaveCtrl',function ($scope, $http, $state, $timeout,baseUrl, port, entity,$stateParams) {
	$scope.parkid = $stateParams.data;
	var currentUser = localStorage['user'];
    if(currentUser){
      $scope.user = JSON.parse(currentUser);
    }
   	var getres = {
	    method:'GET',
	    url:baseUrl+port+entity+'Parkrecord/?Parkrecord.parkid='+$scope.parkid+'&Parkrecord.userid='+$scope.user.id+'&Parkrecord.isleave=0',
	    headers: {'Content-Type': 'application/json'},
	    crossDomain: true
  	};
  	$http(getres).then(function(res){
	    console.log(res.data);
	    if(res.data.Parkrecord==null){
	    	alert("没有车辆在停车场内");
	    	$state.go('main.parking');
	    }
	    else{
	    	$scope.parkrecord = res.data.Parkrecord[0];
	    	var getspace = {
			    method:'GET',
			    url:baseUrl+port+entity+'Parkspace/'+$scope.parkrecord.parkspaceid,
			    headers: {'Content-Type': 'application/json'},
			    crossDomain: true	    		
	    	}
	    	$http(getspace).then(function(res2){    		
	    		$scope.parkspace = res2.data;
	    		var getpark = {
				    method:'GET',
				    url:baseUrl+port+entity+'Parklot/'+$scope.parkid,
				    headers: {'Content-Type': 'application/json'},
				    crossDomain: true	    		
		    	}
		    	$http(getpark).then(function(res3){
		    		$scope.parkinglot = res3.data;
		    		getcharge();
		    	})	
	    	})
	    }

  	});
  	$scope.confirm = function(){
  		getcharge();
		if($scope.user.money < $scope.parkrecord.charge){
  			alert("余额不足，请充值");		  			
  		}
  		else{  			
  			console.log($scope.parkrecord);
		  	var reqAdd = {
		  	  method: 'PUT',
		      url: baseUrl+port+entity+'Parkrecord/'+$scope.parkrecord.id,
		      headers: {'Content-Type': 'application/json'},
		      crossDomain: true,
		      data: JSON.stringify($scope.parkrecord)
		  	}
		  	$http(reqAdd).then(function(res){
		  		$scope.parkspace.isfull = 0;
		  		var reqPUT = {
			  	  method: 'PUT',
			      url: baseUrl+port+entity+'Parkspace/'+$scope.parkspace.id,
			      headers: {'Content-Type': 'application/json'},
			      crossDomain: true,
			      data: JSON.stringify($scope.parkspace)
			  	}
			  	$http(reqPUT).then(function(res2){
		  			$scope.user.money -= $scope.parkrecord.charge; 
		  			var reqCharge = {
		              method: 'PUT',
		              url: baseUrl+port+entity+'user/'+$scope.user.id,
		              headers: {'Content-Type': 'application/json'},
		              crossDomain: true,
		              data: JSON.stringify($scope.user)
		            };
		            $http(reqCharge).then(function(res){
		                console.log(res);
		                $scope.user = res.data;
		                localStorage['user'] = JSON.stringify($scope.user);
		                alert("支付成功");
		                $state.go('main.parking');
		            });	  			
			  	});
		  	})
  		}
  	}
  	$scope.returnback = function(){
    	$state.go('main.parking');
    };
    function getcharge(){
		var now = new Date();
  		var mytime = now.toString();
  		$scope.enterstr = $scope.parkrecord.entertime.split(' ');
  		$scope.entertimestr = $scope.enterstr[4].split(':')
  		console.log($scope.enterstr);
  		$scope.leavestr = mytime.split(' ');
  		$scope.leavetimestr = $scope.leavestr[4].split(':')
  		var flag = 0;
  		if($scope.leavetimestr[1]==$scope.entertimestr[1]){
  			if($scope.leavetimestr[2]>$scope.entertimestr[2]){
  				flag = 1;
  			}
  		}
  		else{
  			if($scope.leavetimestr[1]>$scope.entertimestr[1]){
  				flag = 1;
  			}
  		}
  		var alltime = ($scope.leavestr[2]-$scope.enterstr[2])*24 + ($scope.leavetimestr[0]-$scope.entertimestr[0]) + flag;
  		console.log(alltime);
	  	$scope.parkrecord.leavetime = mytime;
	  	$scope.parkrecord.charge = alltime * $scope.parkinglot.hourcharge;
	  	$scope.parkrecord.isleave = 1;
    }
});