/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('AlertsCtrl', ['$scope','$state',AlertsCtrl]);

function AlertsCtrl($scope,$state) {

    $scope.alerts = [{
        type: 'success',
        msg: '欢迎登陆停车场管理系统!'
    }, {
        type: 'danger',
        msg: '有问题或建议？'
    }];

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}