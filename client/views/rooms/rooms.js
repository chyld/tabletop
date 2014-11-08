(function(){
  'use strict';

  angular.module('tabletop')
  .controller('RoomsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
    $scope.room = {};
    $scope.rooms = [];

    $http.get('/rooms').then(function(response){
      $scope.rooms = response.data.rooms;
    });

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
        }
      });
    };
  }]);
})();
