/* global Boot, DMMenu, PlayerMenu, DMPlay, PlayerPlay */

(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', 'Room', 'User', function($scope, $http, $state, $stateParams, Room, User){
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'the-game');
    $scope.$on('$destroy', function(){
      game.destroy();
    });

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

        var dmStates = {Boot:Boot, Menu:DMMenu, Play:DMPlay},
        playerStates = {Boot:Boot, Menu:PlayerMenu, Play:PlayerPlay},
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
