(function () {
    'use strict';

    angular.module('myApp')
        .controller('engCanteenCtrl',['$scope','$http','$rootScope','resourceFactory','$q', function ($scope, $http, $rootScope,resourceFactory,$q) {
            $scope.contents = null;
            $scope.nos = [1,2,3,4,5];

            //service to get the daily menu data from the API.
            let promises = {
                menu: resourceFactory.getMenu({id:"ASE_ME"})
            }
     
            $q.all(promises).then(function(data){
                $rootScope.blockUI = false;
                
                
                $scope.food = data.menu.data.data;
                $scope.ratings = [ {
                    current: $scope.current,
                    max: 5
                }];

                $scope.current = [];
                for(var i=0; i<$scope.food.length;i++){
                    $scope.current[i] = $scope.food[i].rating;
                };
                console.log($scope.current);


                $scope.getSelectedRating = function (rating) {
                    console.log(rating);
                }

                console.log($scope.food)
                
            });    
                

            /*$scope.max_rating = 5;
            $scope.current_rating = [];
            for(var i=0;i<$scope.food.length;i++){
                $scope.current_rating[i] = $scope.food[i].rating;
            }*/

            $scope.isBreakfast = function(item){
                if(item.type === "breakfast"){

                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.isLunch = function(item){
                if(item.type === "lunch"){

                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.isSnacks = function(item){
                if(item.type === "snacks"){

                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.isDinner = function(item){
                if(item.type === "dinner"){

                    return true;
                }
                else{
                    return false;
                }
            };
            console.log($rootScope.loggedIn == undefined);



        }])
    .directive('starRating', function ($rootScope) {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
                '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                '\u2605' +
                '</li>' +
                '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {

                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    if($rootScope.loggedIn == true){
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating: index + 1
                        });
                    }
                    else{
                        alert("log in first !!!")
                    }

                };

                scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        }
    })


})();
