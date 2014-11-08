(function(){
  'use strict';

  angular.module('tabletop')
  .controller('RoomsCtrl', ['$scope', '$http', '$state', 'User', function($scope, $http, $state, User){
    $('body').css('background-image', 'url("/assets/tabletop.jpg")');
    $scope.room = {};
    $scope.rooms = [];

    $scope.email = User.getEmail();
    if(!$scope.email){
      $scope.$on('email', function(e, email){
        $scope.email = email;
        updateRooms();
      });
    } else {
      updateRooms();
    }

    function updateRooms(){
      $http.get('/rooms').then(function(response){
        $scope.rooms = response.data.rooms;
      });
    }

    $scope.joinGame = function(){
      var self = this;
      $http.post('/rooms/' + self.room._id + '/join', {password:self.password}).then(function(response){
        if(response.data.isAuthenticated){
          $state.go('games', {gameId:self.room._id});
        }
      });
    };

    $scope.submit = function(){
      $http.post('/rooms', $scope.room).then(function(response){
        if(response.data.room){
          $scope.rooms.push(response.data.room);
          $scope.room = {};
        }
      });
    };

    $scope.deleteRoom = function(id){
      $http.delete('/rooms/'+id).then(function(response){
        $scope.rooms = response.data.rooms;
      });
    };
  }]);
})();
