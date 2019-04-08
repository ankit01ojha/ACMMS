(function () {
'use strict';

angular.module('myApp')
    .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
        /*$locationProvider.html5Mode({
            enabled:true,
            requiredBasr: false
        });*/
        $routeProvider
            .when('/',{
                templateUrl: 'main/main.html',
                controller: 'App_Ctrl'
            })
            .when('/admin', {
               templateUrl: 'admin/admin.html',
               controller: 'adminCtrl',
               resolve:{
                   auth:['authService',function($auth){
                       return $auth.checkOwner();
                   }]
               }
            })
            .otherwise({
                redirectTo:'/'
            });
    }]);
})();