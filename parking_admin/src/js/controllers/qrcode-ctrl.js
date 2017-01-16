/**
 * Created by lulifei on 16/12/4.
 */

angular.module('RDash')
    .controller('QRCtrl', ['$scope','$stateParams',QRCtrl]);



function QRCtrl($scope,$stateParams) {
    $scope.myShow = false;
    $scope.showQr = true;

    var id = $stateParams.id;
    console.log(id);

    $scope.init = function () {

        var qrcode = new QRCode(document.getElementById("qrcode"));
        qrcode.makeCode(id.toString());
    };

    $scope.getCodeImg = function () {
        console.log($scope.myCode);
        var qrcode = new QRCode(document.getElementById("myqr"));
        qrcode.makeCode($scope.myCode);
        $scope.myShow = true;
        $scope.showQr = false;
    }

}



