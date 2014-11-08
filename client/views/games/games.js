/* global Boot, Menu, Play */
var game;

(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', 'Room', 'User', function($scope, $http, $state, $stateParams, Room, User){
    game = new Phaser.Game(500, 320, Phaser.CANVAS, 'the-game');

    $scope.email = User.getEmail();
    if ($scope.email) {
      getRoom();
    } else {
      $scope.$on('email', function(err, email){
        if(!$scope.email){
          $scope.email = email;
          getRoom();
        }
      });
    }

    function getRoom(){
      Room.getRoom($stateParams.gameId).then(function(res){
        $scope.room = res.data.room;
        //if($scope.room.email === $scope.email)
      });
    }


    //game states
    game.state.add('boot', Boot);
    game.state.add('menu', Menu);
    game.state.add('play', Play);

    game.state.start('boot');




  }]);
})();
