'use strict';

angular.module('myApp')
    .controller('appCtrl',['$rootScope','$scope','$mdToast','authService','$location','$log',function($rootScope,$scope,$mdToast,authService,$location,$log){
        authService.isLoggedIn();
        $scope.logout = function(){
            authService.logOut();

            $scope.$on("UserLogoutSuccess",function(event,data){
                $rootScope.user = null;
                $rootScope.loggedIn = false;
                $scope.showToast("Logged out!");
                $location.path('/');
                
            });

            $scope.$on("UserLogoutFailure",function(event,data){
                $scope.showToast("Unable to Logout");
            });
        
        }

        $scope.showToast = function (content) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(content)
                    .position('top, right')
                    .hideDelay(5000))
                .then(function () {
                        $log.log('Toast dismissed');
                    }
                ).catch(function () {
                $log.log('Toast failed or was forced closed due to another toast');
            });
        };
    }]);

