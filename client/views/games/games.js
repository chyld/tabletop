(function(){
  'use strict';

  angular.module('tabletop')
  .controller('GamesCtrl', ['$scope', '$http', '$state', '$stateParams', 'User', function($scope, $http, $state, $stateParams, User){
    $('body').css('background-image', 'url("/assets/dandd.jpg")');
    var game = new Phaser.Game(500, 320, Phaser.CANVAS, 'the-game', {preload:preload, create:create, update:update});
    console.log(game);
    function preload(){}
    function create(){}
    function update(){}

    $scope.email = User.getEmail();
    if(!$scope.email){
      $scope.$on('email', function(e, email){
        $scope.email = email;
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
