/**
 * Created by lulifei on 16/12/9.
 */
angular.module('RDash')
    .controller('EditLotCtrl', ['$scope','$state','$stateParams', EditLotCtrl]);

function EditLotCtrl($scope,$state,$stateParams) {
    $scope.myid = $stateParams.id;
    console.log($scope.myid );
    if($scope.myid != 0){
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parklot/' + $scope.myid,
            method: 'GET',
            async: false,
            success: function (data) {
                console.log(data);
                $scope.editLot = data;
                // alert('success!');
            }
        });
    }


    $scope.save = function() {
        if (!$scope.editLot || !$scope.editLot.spacenum || !$scope.editLot.hourcharge
            || !$scope.editLot.xpos || !$scope.editLot.ypos || !$scope.editLot.intro) {
            alert('关键信息不能为空！');
        }
        else {

            var data = {
                "id": parseInt($scope.myid),
                "longitude": parseFloat($scope.editLot.longitude),
                "latitude": parseFloat($scope.editLot.latitude),
                "address": $scope.editLot.address,

                "name": $scope.editLot.name,
                "spacenum": parseInt($scope.editLot.spacenum),
                "hourcharge": parseInt($scope.editLot.hourcharge),
                "xpos": parseInt($scope.editLot.xpos),
                "ypos": parseInt($scope.editLot.ypos),
                "intro": $scope.editLot.intro
            };

            $.ajax({
                url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parklot/' + $scope.myid,
                method: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json',
                async: false,
                success: function (data) {
                    $scope.editLot = data;
                    console.log(data);
                    alert('update success!');
                    $state.go('lot');
                }
            })
        }
    }

    $scope.updateImg = function () {
        var url = "http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parklot/" + $scope.myid;
        console.log(url);
        var files = $(":file")[0].files;
        var formData = new FormData();
        formData.append("file", files[0]);

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert('success!');
                console.log(data);
            }
        })
    }


}