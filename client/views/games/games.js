/* global Boot, DMMenu, PlayerMenu, DMPlay, PlayerPlay */

(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', 'Room', 'User', 'Create', function($scope, $http, $state, $stateParams, Room, User, Create){
    $('body').css('background-image', 'url("/assets/dandd.jpg")');
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

    $scope.characters = [];
    $scope.heros = [];
    Create.getCharacters().then(function(response){
      $scope.characters = response.data.list;
    });

    $scope.playerReady = function(){
      socket.emit('ready', {gameId:$stateParams.gameId, characterId:$scope.characterId});
    };

    socket.on('bReady', function(data){
      $scope.heros.push(data.characterId);
      $scope.hideReady = true;
      $scope.$digest();
    });

    function startGame(){
      Room.getRoom($stateParams.gameId).then(function(res){
        $scope.room = res.data.room;
        $scope.isDM = $scope.room.email === $scope.email;

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

    $scope.messages = [];
    socket.emit('join', $stateParams);
    socket.on('bChat', function(data){
      $scope.messages.push(data);
      $scope.$digest();
    });

    $scope.sendMessage = function(){
      socket.emit('chat', {from:$scope.email, message:$scope.message, gameId:$stateParams.gameId});
      $scope.message = '';
    };
  }]);
})();
