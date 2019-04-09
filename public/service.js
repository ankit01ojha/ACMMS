var app = angular.module('myApp');

app.service('authService',['$rootScope','$http','$q','$location',function(scope,$http,$q,$location){
    this.authenticate = function(username,password){
        scope.blockUI = true;
        $http.post('/api/login',{username:username,password:password}).then(function(result){
            scope.blockUI = false;
            scope.$broadcast("UserAuthenticationSuccess",result.data);
        
        },function(result){
            scope.blockUI = false;
            if(result.status == 500){
                scope.$broadcast("AuthRequestFailure");
            }
            else{
                scope.$broadcast("UserAuthenticationFailure",result.data,result.status);
            }
            
        });
    }

    this.isLoggedIn = function(){
        return $q(function(resolve,reject){
            $http.get('/api/checkAuthenticated').then(function(result){
                if(result.status == 200){
                    scope.loggedIn = true;
                    console.log(result.data);
                    scope.user = result.data.user;
                    resolve();
                }
                else{
                    scope.loggedIn = false;
                    $location.path('/')
                }
            },function(){
                $location.path('/');
            });
        });
    }

    this.checkAdmin = function(){
        return $q(function(resolve,reject){
            $http.get('/api/checkAdmin').then(function(result){
                if(result.status == 200){
                    resolve();
                }
                else{
                    $location.path('/')
                }
            },function(){
                $location.path('/');
            });
        });
    }

    this.checkOwner = function(){
        return $q(function(resolve,reject){
            $http.get('/api/checkOwner').then(function(result){
                if(result.status == 200){
                    resolve();
                }
                else{
                    $location.path('/')
                }
            },function(){
                $location.path('/');
            });
        });
    }

    this.logOut = function(){
        $http.get('/api/logout').then(function(result){
            if(result.status == 200){
                scope.$broadcast("UserLogoutSuccess",result.data);
            }
            else{
                scope.$broadcast("UserLogoutFailure",result.data,result.status);
            }
        },function(){
            scope.$broadcast("UserLogoutFailure");
        });
    }
}]);


app.service('resourceFactory',['$rootScope','$http',function(scope,$http){
    
    /* 
        resourceFactory 
        methods
    */
    this.getItems = function(){
        scope.blockUI = true;
        return $http({
            method:'get',
            url:'/api/items'
        });
    }

    this.createItem = function(data){
        scope.blockUI = true;
        return $http({
            method:'post',
            url:'/api/createitem',
            data:data
        });
    }

    this.registerOwner = function(data){
        scope.blockUI = true;
        return $http({
            method:'post',
            url:'/api/ownerRegistration',
            data:data
        });
    }
    
}]);
