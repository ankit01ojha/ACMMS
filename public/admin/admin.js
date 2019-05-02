'use strict';

angular.module('myApp')
    .controller('adminCtrl', ['$rootScope', '$scope', '$q', '$mdDialog', '$mdToast', '$log', 'resourceFactory','$location',  function ($rootScope, $scope, $q, $mdDialog, $mdToast, $log, resourceFactory, $location) {

        $scope.food=[
            {id: "1", name: "Idli", added: false, type: "Breakfast"},
            {id: "2", name: "Sambar",added: false, type: "Breakfast"},
            {id: "3", name: "White-Chutney",added: false, type: "Breakfast"},
            {id: "4", name: "Orange-Chutney",added: false, type: "Breakfast"},
            {id: "5", name: "Green1-Chutney",added: false, type: "Breakfast"},
            {id: "6", name: "Green2-Chutney",added: false, type: "Breakfast"},
            {id: "7", name: "Poha jaisa dikhne wala kuch",added: false, type: "Breakfast"},
            {id: "8", name: "Namkin sewaii",added: false, type: "Breakfast"},
            {id: "9", name: "Tatti Dosa without masala",added: false, type: "Breakfast"},
            {id: "10", name: "Tatti Dosa with masala",added: false, type: "Breakfast"},
            {id: "11", name: "Bread without butter",added: false, type: "Breakfast"},
            {id: "12", name: "Bread with butter", added: false, type: "Breakfast"},
            {id: "13", name: "Rice normal",added: false, type: "Lunch"},
            {id: "14", name: "Sambar",added: false, type: "Lunch"},
            {id: "15", name: "unknown curry",added: false, type: "Lunch"},
            {id: "16", name: "bread pakoda",added: false, type: "Snacks"},
            {id: "17", name: "roti", added: false, type: "Dinner"},
            {id: "18", name: "unknown dinner curry",added: false, type: "Dinner"},
            {id: "19", name: "fried rice",added: false, type: "Dinner"},
            {id: "20", name: "kanji",added: false, type: "Dinner"},
            {id: "21", name: "vada", added: false, type: "Snacks"}

        ];

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




        $scope.added=false;
        $scope.preview=[];


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

        $scope.addItem = function(ev){
            $mdDialog.show({
                controller: newItemCtrl,
                templateUrl: 'Admin/newItem/newItem.html',
                targetEvent: ev,
                clickOutsideToClose:true
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

            if(item.added == true) {
                for (var i = 0; i < $scope.preview.length; i++) {
                    if (item.id === $scope.preview[i].id) {
                        item.added = false;
                        $scope.preview.splice(i, 1);
                        $scope.showRemovedToast(item);
                        break;
                    }
                }
            }
            else{
                $scope.preview.push(item);
                item.added = true;
                $scope.showAddedToast(item);
            }
            /*sessionStorage.setItem("preview",JSON.stringify($scope.preview));*/
            console.log($scope.preview);
        };




        $scope.showAddedToast = function (item) {
            /*$scope.pinTo = $scope.getToastPosition();*/
            console.log($scope.added);
            if($scope.added==false){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Added ' + item.name)
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

        $scope.showRemovedToast = function (item) {
            /*$scope.pinTo = $scope.getToastPosition();*/
            console.log($scope.added);
            if($scope.added==false){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Removed ' + item.name)
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

        /*$scope.previewItems = function(ev){
            $mdDialog.show({
                controller: previewItemsCtrl,
                templateUrl: 'admin/Preview/preview.html',
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        function previewItemsCtrl($scope, $mdDialog){
            $scope.preview = JSON.parse(sessionStorage.getItem("preview"));
            console.log($scope.preview);

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

        }*/

        $scope.analysis = function(){
            $location.path('/analysis');
        };

    }]);

