'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index',{
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables',{
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('user', {
                url: '/user',
                controller: 'UserCtrl',
                templateUrl: 'templates/user-manager.html',
                cache:false //每次回到这个页面时自动强制刷新
            })
            .state('lot',{
                url: '/lot',
                controller: 'LotCtrl',
                templateUrl: 'templates/park-lot.html',
                cache:false //每次回到这个页面时自动强制刷新
            })
            .state('space',{
                url: '/space',
                controller: 'SpaceCtrl',
                templateUrl: 'templates/park-space.html',
                params: {'id':0,'num':0,'x':0,'y':0},
                cache:false //每次回到这个页面时自动强制刷新
            })
            .state('order',{
                url: '/order',
                controller: 'OrderCtrl',
                templateUrl: 'templates/park-order.html'
            })
            .state('qrCode',{
                url: '/qrCode',
                controller: 'QRCtrl',
                templateUrl: 'templates/qrcode.html',
                params: {'id':0}
            })
            .state('addlot',{
                url:'/addlot',
                controller: 'AddLotCtrl',
                templateUrl: 'templates/addlot.html'
            })
            .state('entry',{
                url:'/entry',
                controller: 'EntryCtrl',
                templateUrl: 'templates/park-entry.html',
                params:{'id':0},
                cache:false //每次回到这个页面时自动强制刷新
            })
            .state('addEntry',{
                url: '/addEntry',
                controller: 'AddEntryCtrl',
                templateUrl: 'templates/addentry.html',
                params:{'id':0}
            })
            .state('editLot',{
                url: '/editLot',
                controller: 'EditLotCtrl',
                templateUrl: 'templates/editlot.html',
                params:{'id':0}
            })
            .state('addUser',{
                url: '/addUser',
                controller: 'AddUserCtrl',
                templateUrl: 'templates/adduser.html',
        });
    }
]);