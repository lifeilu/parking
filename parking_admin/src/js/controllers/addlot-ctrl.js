/**
 * Created by lulifei on 16/12/7.
 */
angular.module('RDash')
    .controller('AddLotCtrl' , ['$scope','$state',AddLotCtrl]);


function AddLotCtrl($scope, $state) {
    myMap();

    $scope.create = function(){
        console.log('创建停车场：经度'+$scope.longi +',纬度'+$scope.lat);
        var data= {
            "longitude":$scope.longi,
            "latitude": $scope.lat,

            // "longitude": parseFloat($scope.newlot.longitude),
            // "latitude": parseFloat($scope.newlot.latitude),
            "address": $scope.newlot.address,
            "name": $scope.newlot.name,
            "spacenum": parseInt($scope.newlot.spacenum),
            "hourcharge": parseInt($scope.newlot.hourcharge),
            "xpos": parseInt($scope.newlot.xpos),
            "ypos": parseInt($scope.newlot.ypos),
            "intro": $scope.newlot.intro
        };
        console.log(data);
        if(!data.longitude || !data.latitude || !data.address || !data.name ||
            !data.spacenum || !data.hourcharge ||!data.xpos ||! data.ypos ||!data.intro){
            alert('关键信息不能为空！');
        }
        else {
            $.ajax({
                // url: baseUrl +'/User/',
                url: 'http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parklot/',
                method: 'POST',
                // data: data,
                data: JSON.stringify(data),
                // headers: {'Content-Type': 'application/json'},
                contentType: 'application/json',
                async: false,
                success: function (data) {
                    if (data) {
                        console.log(data);
                        alert('success!' + data.id);

                    }
                }
            }).done(function (data) {

                var url = "http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD/Parklot/" + data.id;
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
                        $state.go('lot');
                        // $state.go('lot',{});
                        // window.location.href('park-lot.html');
                        // $location.url('/lot');
                    }
                })
            });
        }
    };







    // 百度地图API功能
    function myMap() {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(121.4428690000, 31.0320340000);
        map.centerAndZoom(point, 16);

        //单击获取点击的经纬度，并在图上添加标注
        map.addEventListener("click",function(e){
            alert( e.point.lng + ",纬度" + e.point.lat);
            // longi = e.point.lng;lat = e.point.lat;
            console.log('选中位置：经度'+e.point.lng +',纬度'+e.point.lat);
            $scope.longi = e.point.lng;
            $scope.lat = e.point.lat;
            console.log('赋值后：经度'+$scope.longi +',纬度'+$scope.lat);
            add_point(e.point.lng,e.point.lat);
        });

        //根据经纬度创建点
        function add_point(x,y) {
            // var point = new BMap.Point(121.4428690000, 31.0320340000);
            var marker = new BMap.Marker(new BMap.Point(x, y)); // 创建点
            map.addOverlay(marker);               // 将标注添加到地图中
            marker.disableDragging();
        }

        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });

        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            alert("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError",function(e){
            // 定位失败事件
            alert(e.message);
        });

        map.addControl(navigationControl);
        map.addControl(geolocationControl);
    }
}
