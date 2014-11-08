(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
    var game = new Phaser.Game(500, 320, Phaser.CANVAS, 'the-game', {preload:preload, create:create, update:update});

    console.log(game);

    function preload(){}
    function create(){}
    function update(){}
  }]);
})();
