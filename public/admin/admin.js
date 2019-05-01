'use strict';

angular.module('myApp')
    .controller('adminCtrl', ['$rootScope', '$scope', '$q', '$mdDialog', '$mdToast', '$log', 'resourceFactory', function ($rootScope, $scope, $q, $mdDialog, $mdToast, $log, resourceFactory) {

        $scope.breakfast=[
            {name: "Idli", added: false},
            {name: "Sambar",added: false},
            {name: "White-Chutney",added: false},
            {name: "Orange-Chutney",added: false},
            {name: "Green1-Chutney",added: false},
            {name: "Green2-Chutney",added: false},
            {name: "Poha jaisa dikhne wala kuch",added: false},
            {name: "Namkin sewaii",added: false},
            {name: "Tatti Dosa without masala",added: false},
            {name: "Tatti Dosa with masala",added: false},
            {name: "Bread without butter",added: false},
            {name: "Bread with butter", added: false}
        ];

        $scope.lunch = [
            "Rice normal",
            "Rice fat version",
            "Curry( unknown )",
            "Dahi",
            "Pappad"
        ];

        $scope.snacks = [
            "Bread pakoda",
            "Vadda",
            "Cake",
            "Mirchi ka bhajii"
        ];

        $scope.dinner =[
            "Paneer",
            "Chappati",
            "White Rice",
            "Another Rice",
            "Regular tatti curry",
            "Irregular tatti curry"
        ];


        $scope.added=false;
        $scope.preview=[];

        $scope.addItem = function(ev){
            $mdDialog.show({
                controller: newItemCtrl,
                templateUrl: 'Admin/newItem/newItem.html',
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };
        $scope.editItem = function (ev) {
            $scope.confirm = $mdDialog.prompt()
                .title("Rename the item")
                .placeholder("New name")
                .ariaLabel('new item name')
                .targetEvent(ev)
                .required(true)
                .ok('Rename')
                .cancel('cancel');
            $mdDialog.show($scope.confirm).then(function(result){
                $scope.status = "You have renamed the item to" + result + ".";
            }, function(){
                $scope.status = "You didn\'t rename the item.";
            });
        };

        $scope.deleteItem = function (ev) {
            $scope.confirm = $mdDialog.confirm()
                .title('Delete this item ?')
                .ariaLabel('delete item')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show($scope.confirm).then(function(){
                $scope.status = 'You deleted this item';
            },function(){
                $scope.status = 'Cancel';
            });
        };



        function newItemCtrl($scope, $mdDialog){
            $scope.itemType = [
                'Breakfast',
                'Lunch',
                'Snacks',
                'Dinner'
            ];

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

        }

        $scope.addedToPreview = function(item){
            console.log(item);

            if(item.added == true) {
                for (var i = 0; i < $scope.preview.length; i++) {
                    if (item.name === $scope.preview[i]) {
                        item.added = false;
                        $scope.preview.splice(i, 1);
                        $scope.showRemovedToast(item.name);
                        break;
                    }
                }
            }
            else{
                $scope.preview.push(item.name);
                item.added = true;
                $scope.showAddedToast(item.name);
            }
            console.log($scope.preview);
        };




        $scope.showAddedToast = function (name) {
            /*$scope.pinTo = $scope.getToastPosition();*/
            console.log($scope.added);
            if($scope.added==false){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Added ' + name)
                        .position('top, right')
                        .hideDelay(1000))
                    .then(function () {
                            $log.log('Toast dismissed');
                        }
                    ).catch(function () {
                    $log.log('Toast failed or was forced closed due to another toast');
                });
            }

        };

        $scope.showRemovedToast = function (name) {
            /*$scope.pinTo = $scope.getToastPosition();*/
            console.log($scope.added);
            if($scope.added==false){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Removed ' + name)
                        .position('top, right')
                        .hideDelay(1000))
                    .then(function () {
                            $log.log('Toast dismissed');
                        }
                    ).catch(function () {
                    $log.log('Toast failed or was forced closed due to another toast');
                });
            }

        };

    }]);

