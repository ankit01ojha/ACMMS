(function () {
    'use strict';

    angular.module('myApp')
        .controller('App_Ctrl',['$rootScope','$scope','$mdDialog','$mdToast','$interval','$log','authService', function ($rootScope,$scope,$mdDialog,$mdToast,$interval,$log,authService) {
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

                $scope.login = function(){
                    $scope.logging = true;
                    authService.authenticate($scope.username,$scope.password);
                    $scope.$on("UserAuthenticationSuccess",function(event,data){
                        $scope.logging = false;
                        $scope.authenticationFailed = false;
                        $rootScope.user = data.user;
                        $rootScope.loggedIn = true;
                        $mdDialog.cancel();
                    });

                    $scope.$on("UserAuthenticationFailure",function(event,data,status){
                        $scope.logging = false;
                        $scope.authenticationFailed = true;
                        $scope.showToast("Incorrect Username or Password");
                    });


                    $scope.$on("AuthRequestFailure",function(event,data,status){
                        $scope.logging = false;
                        $scope.authenticationFailed = true;
                        $scope.showToast("Internal Server Error");
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
            }
        }]);
})();
