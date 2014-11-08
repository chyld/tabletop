/* global Boot, Menu, Play */
var game;

(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', 'Room', function($scope, $http, $state, $stateParams, Room){
    game = new Phaser.Game(500, 320, Phaser.CANVAS, 'the-game');

    //console.log(game);

    Room.getRoom($stateParams.gameId).then(success, failure);

    function success(res){
      $scope.room = res.data.room;
    }

    function failure(){
      console.log('failed');
    }


    //game states
    game.state.add('boot', Boot);
    game.state.add('menu', Menu);
    game.state.add('play', Play);

    game.state.start('boot');

    //get list of characters
    //choose character
    //



  }]);
})();
