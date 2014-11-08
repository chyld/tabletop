(function(){
  'use strict';

  angular.module('tabletop')
  .controller('RoomsCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
    $scope.room = {};
    $scope.rooms = [];
    $http.get('/rooms').then(function(response){
      $scope.rooms = response.data.rooms;
    });
    $scope.submit = function(){
      $http.post('/rooms', $scope.room).then(function(response){
        if(response.data.room){
          $scope.rooms.push(response.data.room);
        }
      });
    };
  }]);
})();
