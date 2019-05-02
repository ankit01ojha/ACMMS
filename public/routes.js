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
            .when('/bioCanteen',{
                templateUrl: 'BioCanteen/BioCanteen.html',
                controller: 'bioCanteenCtrl'
            })
            .when('/mess',{
                templateUrl: 'Mess/mess.html',
                controller: 'messCtrl'
            })
            .when('/engCanteen',{
                templateUrl: 'EngCanteen/engCanteen.html',
                controller: 'engCanteenCtrl'
            })
            .when('/analysis', {
                templateUrl: 'admin/analysis/analysis.html',
                controller: 'analysisCtrl'
            })
            .otherwise({
                redirectTo:'/'
            });
    }]);
})();