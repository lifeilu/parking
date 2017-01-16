angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies','ngBaiduMap','ngDialog', 'smart-table'])
    .constant('baseUrl','http://112.74.62.114:8080/Entity/Udb7fe87147e10/SZLKD')
    .constant('baiduUrl','http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&output=json&ak=nhB87EF7jEp0diMOOTjHkXYyHQwGKojT')
    .constant('bmapUrl','http://api.map.baidu.com/staticimage/v2?ak=nhB87EF7jEp0diMOOTjHkXYyHQwGKojT');
//     .filter("unique", unique());
//
// function unique() {
//         return function (arr, field) {
//             var o = {}, i, l = arr.length, r = [];
//             for(i=0; i<l;i+=1) {
//                 o[arr[i][field]] = arr[i];
//             }
//             for(i in o) {
//                 r.push(o[i]);
//             }
//             return r;
//         };
//     }
    // .filter("myImageUrl", function(bmapUrl){
    //     return function(input){
    //         // var words = input.split(' ');
    //         return bmapUrl  + '&center=' + input.uu +','+ input.ii;
    //         // return bmapUrl  + '&center=' + input;
    //     }
    // });