(function(){
  'use strict';

  angular.module('tabletop')
  .controller('UsersCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
    $scope.charClasses = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard'];
    $scope.statNames = ['str', 'dex', 'con', 'cha', 'int', 'wis'];
    $scope.charStats = {
      str: 0,
      dex: 0,
      con: 0,
      cha: 0,
      int: 0,
      wis: 0
    }
    $scope.rollDice = function() {
      for(var i = 0; i < $scope.statNames.length; i++) {
        for(var j = 0; j < 3; j++) {
          $scope.charStats[$scope.statNames[i]] += Math.floor(Math.random() * 6 + 1);
        }
      }
    }
    $scope.rollDice();
    console.log($scope.charStats);
  }]);
})();

