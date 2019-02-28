(function () {
    'use strict';

    angular.module('myApp')
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('pink')
                .accentPalette('orange');
            
        });
})();