(function () {
    'use strict';

    angular.module('myApp')
        .config(['$mdThemingProvider','$httpProvider',function ($mdThemingProvider,$httpProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('pink')
                .accentPalette('orange');
            
            $httpProvider.defaults.withCredentials = true;

            
        }]);
})();