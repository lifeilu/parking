angular.module('parking').controller('ParkingCtrl',function ($scope, $http, $state, $timeout,$cordovaBarcodeScanner,baseUrl, port, entity) {
	$scope.getin = function(){
		$cordovaBarcodeScanner.scan().then(function(imageData) {
			$state.go('enter',{data:imageData.text});	
			console.log("Barcode Format -> " + imageData.format);
			console.log("Cancelled -> " + imageData.cancelled);
		}, function(error) {
			console.log("An error happened -> " + error);
		});
	}
	$scope.leave = function(){
		$cordovaBarcodeScanner.scan().then(function(imageData) {
			$state.go('leave',{data:imageData.text});	
			console.log("Barcode Format -> " + imageData.format);
			console.log("Cancelled -> " + imageData.cancelled);
		}, function(error) {
			console.log("An error happened -> " + error);
		});
	}
	$scope.search = function(){
		$state.go('lotsearch');
	}
});