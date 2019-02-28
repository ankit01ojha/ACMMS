(function () {
    'use strict';

    angular.module('myApp')
        .controller('App_Ctrl', function ($scope, $mdDialog, $interval) {
            $scope.showLogin = function(ev){
                $mdDialog.show({
                    controller: loginCtrl,
                    templateUrl: 'Login/Login.html',
                    /*parent: angular.elememt(document.body),*/
                    targetEvent: ev,
                    clickOutsideToClose:true
                });
            };

            function loginCtrl($scope,$mdDialog){
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }
        });
})();
