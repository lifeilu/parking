/**
 * Created by lulifei on 16/12/16.
 */
angular.module('RDash')
    .controller('AddUserCtrl' , ['$scope', '$state', AddUserCtrl]);

function AddUserCtrl($scope, $state) {

    $scope.createUser = function () {
        var data = {
            "username": $scope.create.username,
            "phone": $scope.create.phone,
            "password": $scope.create.password,
            "cartype": $scope.create.cartype,
            "carid": $scope.create.carid,
            "money": 0
        }
        console.log(data);
        if(!data.username || !data.phone || !data.password ||! data.cartype ||!data.carid){
            alert('关键信息为空！');
        }
        else{

            $.ajax({
                // url: baseUrl +'/User/',
                url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/User/',
                method: 'POST',
                async: false,
                data: JSON.stringify(data),
                // headers: {'Content-Type': 'application/json'},
                contentType: 'application/json',
                success: function (data) {
                    if (data) {
                        console.log(data);
                        alert('create user success!');
                        $state.go('user');
                    }
                }
            });
        }
    }

}