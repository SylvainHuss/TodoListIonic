let listname="";
let username="";

angular.module('starter.controllers', [])



.controller('DashCtrl', function($scope, $http, $window) {
  $scope.formData = {};

  $scope.changerPage = function(){
      $http.post('/api/user/', $scope.formData)
      .success(function(data) {
          username=$scope.formData.username;
          $window.location.replace('#/tab/pagecategory');
          $scope.formData = {};
      })
      .error(function(data) {
          console.log('Error : ' );
      }); 
      
  }

  $scope.creerCompte = function(){
      $http.post('/api/createuser/', $scope.formData)
      .success(function() {
          $scope.formData = {};
      })
      .error(function() {
          console.log('Error : ');
      }); 
  }
})


.controller('categoryController', function($scope, $http, $window) {

    $http.get('/api/category')
        .success(function(data) {
            $scope.categories = data;
            
        })
        .error(function(data) {
            console.log('Error : ' );
    });

    $http.get('/api/user')
    .success(function(data) {
        $scope.username = username;
        
    })
    .error(function(data) {
        console.log('Error : ' );
    });

    $scope.createCategory = function(category) {
        $http.post('/api/category/' + category)
            .success(function(data) {
                $scope.categories = data;
                
            })
            .error(function(data) {
                console.log('Error : ' );
            }); 
    };

    $scope.deleteCategory = function(id) {
        var conf = confirm("Are you sure to delete the entire category?");
        if (conf){
            $http.delete('/api/category/' + id)
                .success(function(data) {
                    $scope.categories = data;
                    
                })
                .error(function(data) {
                    console.log('Error : ' );
                }); 
            };
    };

    $scope.changerPage = function(){
        $window.location.replace('#/tab/dash');
    }

    $scope.voirTaches = function(name){
        listname = name;
        $window.location.replace('#/tab/list');
    }
})


.controller('mainController', function($scope, $http, $window) {
    $scope.listname = listname;

    //Obtenir la liste (appel à la fonction get dans server.js)
    $http.get('/api/laliste')
        .success(function(data) {
          console.log(data);
            // if (data == 401) $window.location.href = '/accueil';
            // else $scope.laliste = data;
            $scope.laliste = data;
        })
        .error(function(data) {
            console.log('Error : ' );
    });

    //Obtenir la liste (appel à la fonction get dans server.js)
    $http.get('/api/category')
        .success(function(data) {
            $scope.categories = data;
            
        })
        .error(function(data) {
            console.log('Error : ' );
    });

    $http.get('/api/user')
    .success(function(data) {
        $scope.username = data;
        
    })
    .error(function(data) {
        console.log('Error : ' );
});

    //rajout d'une donnée (appel à la fonction post dans server.js)
    $scope.createTodo = function(category, newtask) {
        $http.post('/api/laliste/' + category + '/' + newtask)
            .success(function(data) {
                $scope.laliste = data;
                
            })
            .error(function(data) {
                console.log('Error : ' );
            }); 
    };

    $scope.createCategory = function(category) {
        $http.post('/api/category/' + category)
            .success(function(data) {
                $scope.categories = data;
                
            })
            .error(function(data) {
                console.log('Error : ' );
            }); 
    };

    //rajout d'une donnée (appel à la fonction delete dans server.js)
    $scope.deleteTodo = function(id) {
        $http.delete('/api/laliste/' + id)
            .success(function(data) {
                $scope.laliste = data;
                
            })
            .error(function(data) {
                console.log('Error : ' );
            }); 
    };

    $scope.deleteCategory = function(id) {
        var conf = confirm("Are you sure to delete the entire category?");
        if (conf){
            $http.delete('/api/category/' + id)
                .success(function(data) {
                    $scope.categories = data;
                    
                })
                .error(function(data) {
                    console.log('Error : ' );
                }); 
            };
    };

    $scope.check = function(id){
        $http.put('/api/laliste/' + id)
            .success(function(data){
                $scope.laliste = data;
                
            })
            .error(function(data) {
                console.log('Error : ' );
            }); 
    };

    $scope.changename = function(id, newtext){
        $http.put('/api/laliste/todo/' + id + '/' + newtext)
            .success(function(data){
                $scope.newData = {}
                $scope.laliste = data;
                
            })
            .error(function(data) {
                console.log('Error : ' );
            }); 
    };

    $scope.changerPage = function(){
        $window.location.replace('#/tab/dash');
    }

    $scope.retour = function(){
        $window.location.replace('#/tab/pagecategory');
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
