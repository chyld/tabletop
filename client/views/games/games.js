/* global Boot, Menu, Play */

(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', 'Room', 'User', function($scope, $http, $state, $stateParams, Room, User){
    var game = new Phaser.Game(500, 320, Phaser.CANVAS, 'the-game');

    $scope.email = User.getEmail();
    if ($scope.email) {
      startGame();
    } else {
      $scope.$on('email', function(err, email){
        if(!$scope.email){
          $scope.email = email;
          startGame();
        }
      });
    }

    function startGame(){
      Room.getRoom($stateParams.gameId).then(function(res){
        $scope.room = res.data.room;

        var dmStates = {Boot:Boot, Menu:Menu, Play:Play},
        playerStates = {Boot:Boot, Menu:Menu, Play:Play},
        states = $scope.room.email === $scope.email ? dmStates : playerStates;
        console.log(states);

        //game states
        game.state.add('boot', states.Boot);
        game.state.add('menu', states.Menu);
        game.state.add('play', states.Play);

        game.state.start('boot');
      });
    }
  }]);
})();
