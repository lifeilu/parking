/**
 * Created by lulifei on 16/12/4.
 */

angular.module('RDash')
    .controller('UserCtrl', ['$scope','$state', UserCtrl]);


function UserCtrl($scope, $state) {

    $scope.showAlert = true;
    $scope.closeAlert = function() {
       $scope.showAlert = false;
    };
    // var baseUrl = 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD';
    //can't identify http as a function

    $scope.listshow = true;
    $scope.listMessage = '收起';


    $.ajax({
        // url: baseUrl +'/User/',
        url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/User/',
        method: 'GET',
        async: false,
        success: function (data) {
            if (data.User) {
                $scope.rowCollection = data.User;
                $scope.usernum =  $scope.rowCollection.length;
                console.log($scope.rowCollection);
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


    $scope.deleteUser = function (row) {

        var r = confirm("确认删除？");
        if (r == true) {
            console.log('delete');

            $.ajax({
                url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/User/' + row.id,
                method: 'DELETE',
                async: false,
                success: function (data) {
                    alert(' delete success');
                    if (data.message) {
                        console.log(data);
                        alert('success!');
                    }
                }
            }).done(function () {
                // $state.reload();
                var index = $scope.rowCollection.indexOf(row);
                if (index !== -1) {
                    $scope.rowCollection.splice(index, 1);
                }
                //刷新页面  window.location.reload();
            })
        }
        else {
            console.log('cancel');
        }
    };

    $scope.search = function () {
        // alert(baseUrl);
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/User/',
            method: 'GET',
            async: false,
            success: function (data) {
                    if (data.User) {
                        $scope.rowCollection = data.User;
                        console.log($scope.rowCollection);
                        alert('success!');
                }
            }
        });
    }

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