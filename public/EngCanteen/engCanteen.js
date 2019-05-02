(function () {
    'use strict';

    angular.module('myApp')
        .controller('engCanteenCtrl', function ($scope, $http, $rootScope) {
            $scope.contents = null;
            $scope.nos = [1,2,3,4,5];

            //service to get the daily menu data from the API.
            $scope.food=[
                {id: "1", rating: 1, name: "Idli", added: false, type: "Breakfast"},
                {id: "2", rating: 1, name: "Sambar",added: false, type: "Breakfast"},
                {id: "3", rating: 1, name: "White-Chutney",added: false, type: "Breakfast"},
                {id: "4", rating: 1, name: "Orange-Chutney",added: false, type: "Breakfast"},
                {id: "5", rating: 1, name: "Green1-Chutney",added: false, type: "Breakfast"},
                {id: "6", rating: 1, name: "Green2-Chutney",added: false, type: "Breakfast"},
                {id: "7", rating: 1, name: "Poha jaisa dikhne wala kuch",added: false, type: "Breakfast"},
                {id: "8", rating: 1, name: "Namkin sewaii",added: false, type: "Breakfast"},
                {id: "9", rating: 1, name: "Dosa without masala",added: false, type: "Breakfast"},
                {id: "10",rating: 1,  name: "Dosa with masala",added: false, type: "Breakfast"},
                {id: "11",rating: 1,  name: "Bread without butter",added: false, type: "Breakfast"},
                {id: "12",rating: 1,  name: "Bread with butter", added: false, type: "Breakfast"},
                {id: "13",rating: 1,  name: "Rice normal",added: false, type: "Lunch"},
                {id: "14",rating: 1,  name: "Sambar",added: false, type: "Lunch"},
                {id: "15",rating: 1,  name: "unknown curry",added: false, type: "Lunch"},
                {id: "16",rating: 1,  name: "bread pakoda",added: false, type: "Snacks"},
                {id: "17",rating: 1,  name: "roti", added: false, type: "Dinner"},
                {id: "18",rating: 1,  name: "unknown dinner curry",added: false, type: "Dinner"},
                {id: "19",rating: 1,  name: "fried rice",added: false, type: "Dinner"},
                {id: "20",rating: 2,  name: "kanji",added: false, type: "Dinner"},
                {id: "21",rating: 2,  name: "vada", added: false, type: "Snacks"}

            ];
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

            /*$scope.max_rating = 5;

            $scope.current_rating = [];
            for(var i=0;i<$scope.food.length;i++){
                $scope.current_rating[i] = $scope.food[i].rating;
            }*/

            $scope.isBreakfast = function(item){
                if(item.type === "Breakfast"){

                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.isLunch = function(item){
                if(item.type === "Lunch"){

                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.isSnacks = function(item){
                if(item.type === "Snacks"){

                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.isDinner = function(item){
                if(item.type === "Dinner"){

                    return true;
                }
                else{
                    return false;
                }
            };
            console.log($rootScope.loggedIn == undefined);



        })
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

