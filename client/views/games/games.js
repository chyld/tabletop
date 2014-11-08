/* global Boot */
var game;

(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
    game = new Phaser.Game(500, 320, Phaser.CANVAS, 'the-game');

    //console.log(game);

    //game states
    game.state.add('boot', Boot);
    //game.state.add('menu', Menu);

    game.state.start('boot');

  }]);
})();
