'use strict';

angular.module('myApp')
    .controller('adminCtrl', ['$rootScope', '$scope', '$q', '$mdDialog', '$mdToast', '$log', 'resourceFactory', '$route', function ($rootScope, $scope, $q, $mdDialog, $mdToast, $log, resourceFactory,$route) {
        
        // $scope.food=[
        //     {id: "1", name: "Idli", added: false, type: "Breakfast"},
        //     {id: "2", name: "Sambar",added: false, type: "Breakfast"},
        //     {id: "3", name: "White-Chutney",added: false, type: "Breakfast"},
        //     {id: "4", name: "Orange-Chutney",added: false, type: "Breakfast"},
        //     {id: "5", name: "Green1-Chutney",added: false, type: "Breakfast"},
        //     {id: "6", name: "Green2-Chutney",added: false, type: "Breakfast"},
        //     {id: "7", name: "Poha jaisa dikhne wala kuch",added: false, type: "Breakfast"},
        //     {id: "8", name: "Namkin sewaii",added: false, type: "Breakfast"},
        //     {id: "9", name: "Tatti Dosa without masala",added: false, type: "Breakfast"},
        //     {id: "10", name: "Tatti Dosa with masala",added: false, type: "Breakfast"},
        //     {id: "11", name: "Bread without butter",added: false, type: "Breakfast"},
        //     {id: "12", name: "Bread with butter", added: false, type: "Breakfast"},
        //     {id: "13", name: "Rice normal",added: false, type: "Lunch"},
        //     {id: "14", name: "Sambar",added: false, type: "Lunch"},
        //     {id: "15", name: "unknown curry",added: false, type: "Lunch"},
        //     {id: "16", name: "bread pakoda",added: false, type: "Snacks"},
        //     {id: "17", name: "roti", added: false, type: "Dinner"},
        //     {id: "18", name: "unknown dinner curry",added: false, type: "Dinner"},
        //     {id: "19", name: "fried rice",added: false, type: "Dinner"},
        //     {id: "20", name: "kanji",added: false, type: "Dinner"},
        //     {id: "21", name: "vada", added: false, type: "Snacks"}

        // ];

        function loadFood(){
            console.log("Loading..");
            let promises = {
                food: resourceFactory.getItems(),
                menu: resourceFactory.getMenuLoggedIn()
            }
     
            $q.all(promises).then(function(data){
                $rootScope.blockUI = false;
                
                let menuitems = data.menu.data.data;
                $scope.food = data.food.data.data;
                $scope.food.forEach(function(item){
                    item.type = item.default_type;
                    let flag = 0;
                    for(var i=0;i<menuitems.length;i++){
                        if(menuitems[i].id == item.id){
                            flag = 1;
                            // item.added = true;
                            //$scope.preview.push(item);
                            break;
                        }
                    }
                    if(flag == 0){
                        item.added = false;
                    }
                });

                console.log($scope.food);

                
                
                
            });    
        }

        loadFood();
        
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




        $scope.added=false;
        $scope.preview=[];


        $scope.editItem = function (item) {
            $scope.confirm = $mdDialog.prompt()
                .title("Rename the item")
                .placeholder("New name")
                .ariaLabel('new item name')
                .required(true)
                .ok('Rename')
                .cancel('cancel');
            $mdDialog.show($scope.confirm).then(function(result){
                $scope.status = "You have renamed the item to" + result + ".";
                item.name = result;
                resourceFactory.editItem({id:item.id,name:result}).then(function(res){
                    loadFood();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.data.message)
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    });
                },function(res){
                    $rootScope.blockUI = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.data.message)
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    });
                });
            }, function(){
                $scope.status = "You didn\'t rename the item.";
            });
        };

        $scope.deleteItem = function (item) {
            $scope.confirm = $mdDialog.confirm()
                .title('Delete this item ?')
                .ariaLabel('delete item')
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show($scope.confirm).then(function(){
                $scope.status = 'You deleted this item';
                resourceFactory.deleteItem({id:item.id}).then(function(res){
                    loadFood();
                    $scope.preview = $scope.preview.filter(function(pitem){
                        return pitem.id != item.id;
                    });
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.data.message)
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    });
                },function(res){
                    
                    $rootScope.blockUI = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.data.message)
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    });
                    
                });
            },function(){
                $scope.status = 'Cancel';
            });
        };

        $scope.addItem = function(ev){
            $mdDialog.show({
                controller: newItemCtrl,
                templateUrl: 'admin/newItem/newItem.html',
                targetEvent: ev,
                clickOutsideToClose:true
            });

            
        };

        function newItemCtrl($scope,$rootScope, $mdDialog,$mdToast,$route,resourceFactory){
            $scope.itemType = [
                'breakfast',
                'lunch',
                'snacks',
                'dinner'
            ];

            $scope.createItem = function(){
                resourceFactory.createItem({name:$scope.name,type:$scope.type}).then(function(res){
                    
                    if(res.status == 200){
                        loadFood();
                        $rootScope.blockUI = false;
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Added ' + $scope.name)
                                .position('top, right')
                                .hideDelay(1000))
                            .then(function () {
                                    $log.log('Toast dismissed');
                                    
                                }
                            ).catch(function () {
                            $log.log('Toast failed or was forced closed due to another toast');
                        });
                        $mdDialog.cancel();
                    }
                    
                },function(res){
                    console.log(res);
                    $rootScope.blockUI = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.data.message)
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    });
                });
                
            }
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

        }

        $scope.addedToPreview = function(item){
            console.log(item.added);
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

        $scope.submitPreview = function(){
            $scope.confirm = $mdDialog.confirm()
            .title('Create Menu for today?')
            .ariaLabel('Create Menu')
            .ok('Submit')
            .cancel('Cancel');

            $mdDialog.show($scope.confirm).then(function(){
                resourceFactory.createMenu({items:$scope.preview}).then(function(res){
                    loadFood();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Updated today's menu!")
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    })
                },function(res){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.data.message)
                            .position('top, right')
                            .hideDelay(1000))
                        .then(function () {
                                $log.log('Toast dismissed');
                            }
                        ).catch(function () {
                        $log.log('Toast failed or was forced closed due to another toast');
                    })
                });
                $scope.status = "Updated";
            },function(){
                $scope.status = 'Cancel';
            });
        }

        $scope.showConfirm = function(num){
            if(num == 1){
                $scope.confirm = true;
            }
            else{
                $scope.confirm = false;
            }

            console.log("Tab changed");
        }

    }]);

