'use strict';

angular.module('myApp')
    .controller('appCtrl',['$rootScope','$scope','authService',function($rootScope,$scope,authService){
        authService.isLoggedIn();
    }]);

