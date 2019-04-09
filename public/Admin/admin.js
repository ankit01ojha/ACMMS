'use strict';

angular.module('myApp')
    .controller('adminCtrl', function($scope, $mdDialog, $mdToast, $log){
        $scope.breakfast=[
            "Idli",
            "Sambar",
            "White-Chutney",
            "Orange-Chutney",
            "Green1-Chutney",
            "Green2-Chutney",
            "Poha jaisa dikhne wala kuch",
            "Namkin sewaii",
            "Tatti Dosa without masala",
            "Tatti Dosa with masala",
            "Bread without butter",
            "Bread with butter"
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
        $scope.preview = [];
        $scope.isOpen = false;
        $scope.adding = ['A'];

        $scope.previewItems = function(ev){
            $mdDialog.show({
                controller: newPreviewCtrl,
                templateUrl: 'Admin/Preview/preview.html',
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

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





        $scope.showToast = function (item) {
          /*$scope.pinTo = $scope.getToastPosition();*/
            $scope.preview.push(item);

            for(var i=0;i<$scope.preview.length-1;i++){
                if(item=== $scope.preview[i]){
                    $scope.preview.splice($scope.preview.length-1,1);
                }
            }
            console.log($scope.preview);
            if($scope.added==false){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Added')
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
        function newPreviewCtrl($scope, $mdDialog){
            $scope.x = ['A'];
            console.log($scope.x);
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

        }
    });

