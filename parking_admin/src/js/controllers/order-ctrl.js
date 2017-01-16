/**
 * Created by lulifei on 16/12/4.
 */
angular.module('RDash')
    .controller('OrderCtrl', ['$scope', '$cookieStore', OrderCtrl]);

function OrderCtrl($scope) {
    $scope.listshow = true;
    $scope.listMessage = '收起';
    $.ajax({
        // url: baseUrl +'/User/',
        url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parkrecord/',
        method: 'GET',
        async: false,
        success: function (data) {
            if (data.Parkrecord) {
                $scope.rowCollection = data.Parkrecord;
                $scope.ordernum = $scope.rowCollection.length;
                console.log($scope.rowCollection);
                if($scope.rowCollection){
                    $scope.rowCollection.forEach(function(row){
                        // $scope.userid = list
                        row.entertime = parseDate(new Date(Date.parse(row.entertime)));
                        if(row.leavetime == null){
                            row.leavetime = "尚未离开";
                        }
                        else{
                            row.leavetime = parseDate(new Date(Date.parse(row.leavetime)));
                        }

                    })
                }
                // alert('success!');
            }
        }
    });


    $scope.changeView = function () {
        $scope.listshow = !$scope.listshow;
        if ($scope.listshow) {
            $scope.listMessage = '收起';
        }
        else {
            $scope.listMessage = '显示';
        }

    };


    $scope.search = function () {
        // alert(baseUrl);
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parkrecord/',
            method: 'GET',
            async: false,
            success: function (data) {
                if (data.Parkrecord) {
                    $scope.rowCollection = data.Parkrecord;
                    console.log($scope.rowCollection);
                    if($scope.rowCollection){
                        $scope.rowCollection.forEach(function(row){
                            // $scope.userid = list
                            row.entertime = parseDate(new Date(Date.parse(row.entertime)));
                            if(row.leavetime == null){
                                row.leavetime = "尚未离开";
                            }
                            else{
                                row.leavetime = parseDate(new Date(Date.parse(row.leavetime)));
                            }
                        })
                    }
                    alert('success!');
                }
            }
        });
    };

    function parseDate(d) {
            // var   year=d.getYear();
            var   month = d.getMonth()+1;
            var   date = d.getDate();
            var   hour = d.getHours();
            var   minute = d.getMinutes();
            var   second = d.getSeconds();
            return   "2016-"+ month+"-"+ date + "   "+ hour+ ":" + minute+ ":" + second;

    }

}