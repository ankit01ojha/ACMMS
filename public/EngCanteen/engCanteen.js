(function () {
    'use strict';

    angular.module('myApp')
        .controller('engCanteenCtrl', function ($scope, $http) {
            $scope.contents = null;
            $scope.nos = [1,2,3,4,5];

            //service to get the daily menu data from the API.
            $http.get('data/eng.json')
                .then(function(data){
                    $scope.contents = data;
                    console.log(data);
                });

            $scope.rating = []

            $scope.ratings = [ {
                current: 1,
                max: 5
            }];

            $scope.getSelectedRating = function (rating) {
                console.log(rating);
            }


            $scope.sendRate = function(){
                alert("Thanks for your rates!\n\nFirst Rate: " + $scope.ratings[0].current+"/"+$scope.ratings[0].max
                    +"\n"+"Second rate: "+ $scope.ratings[1].current+"/"+$scope.ratings[0].max)
            }
        })

    .directive('starRating', function () {
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
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        }
    });
})();

