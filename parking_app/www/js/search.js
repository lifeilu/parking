/**
 * Created by lulifei on 16/12/13.
 */
angular.module('parking').filter("image", function(baseUrl, port,fileurl){
  return function(input){
    return baseUrl + port + fileurl + '/Parklot/' + input;
  }
}).controller('SearchCtrl', function ($cacheFactory,$location,$scope,$http,$state,baseUrl, port, entity) {
  console.log($scope.user);
  var getrecord = {
    method:'GET',
    url:baseUrl+port+entity+'Parkrecord/?Parkrecord.userid='+$scope.user.id+'&Parkrecord.isleave=1',
    headers: {'Content-Type': 'application/json'},
    crossDomain: true
  }
  $http(getrecord).then(function(res){
    console.log(res);
    $scope.lists = res.data.Parkrecord;
    var first=$scope.lists[0].entertime;
    var last = $scope.lists[0].leavetime;
    var total=0;
    console.log(first);
    console.log(last);
    console.log(total);
    if($scope.lists) {
      $scope.lists.forEach(function (list) {
        if (list.entertime < first)
          first = list.entertime;
        if (list.leavetime > last)
          last = list.leavetime;
        total = list.charge + total;
      });

      //可读性较差
      // $scope.first = first;
      // $scope.last = last;

      //调用parse有时候会解析错误
      // $scope.first = Date.parse(first);
      // $scope.last = Date.parse(last);

      $scope.first = parseDate(new Date(Date.parse(first)));
      $scope.last = parseDate(new Date(Date.parse(last)));

      $scope.total = total;
      $scope.times = $scope.lists.length;

    }
  });

  function parseDate(d) {
      // var   year=d.getYear();
      var   month = d.getMonth()+1;
      var   date = d.getDate();
      var   hour = d.getHours();
      var   minute = d.getMinutes();
      var   second = d.getSeconds();
      return   "2016-"+ month+"-"+ date + "   "+ hour+ ":" + minute+ ":" + second;
    }



});
