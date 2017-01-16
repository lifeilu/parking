/**
 * Created by lulifei on 16/12/9.
 */



angular.module('RDash')
    .controller('AddEntryCtrl', ['$scope','$state','$stateParams', AddEntryCtrl]);

function AddEntryCtrl($scope,$state,$stateParams) {

    $scope.parkid = $stateParams.id;
    console.log($scope.parkid);

    $scope.createEntry = function () {
        console.log($scope.entryx);
        console.log($scope.entryy);

        if(!$scope.parkid || !$scope.entryx || !$scope.entryy){
            alert("关键信息为空");
        }
        else{
            var data = {
                "parkid": $scope.parkid,
                // "x": $scope.entryx,
                // "y": $scope.entryy
                "x": parseInt($scope.entryx),
                "y": parseInt($scope.entryy)
            };

            console.log(data);
            $.ajax({
                // url: baseUrl +'/User/',
                url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parkentry/',
                method: 'POST',
                async: false,
                data: JSON.stringify(data),
                // headers: {'Content-Type': 'application/json'},
                contentType: 'application/json',
                success: function (data) {
                    if (data) {
                        console.log(data);
                        alert('create entry success!');
                        $state.go('entry',{id:$scope.parkid});
                    }
                }
            });
        }
    }
}
