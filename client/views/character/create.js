(function(){
  'use strict';

  angular.module('tabletop')
  .controller('CharCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
    // change charClass to be dynamic
    $scope.charClass = 'Barbarian';
    $scope.charClasses = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard'];
    $scope.statModifiers = [['con', 'con'], ['cha', 'cha'], ['int', 'wis'], ['int', 'con'], ['str', 'str'], ['con', 'wis'], ['str', 'int'], ['dex', 'con'], ['dex', 'dex'], ['int', 'int'], ['wiz', 'wiz']];
    $scope.statNames = ['str', 'dex', 'con', 'cha', 'int', 'wis'];
    $scope.charStats = {
      str: 0,
      dex: 0,
      con: 0,
      cha: 0,
      int: 0,
      wis: 0
    };
    var rollDice = function(){
      for(var i = 0; i < $scope.statNames.length; i++) {
        for(var j = 0; j < 3; j++) {
          $scope.charStats[$scope.statNames[i]] += Math.floor(Math.random() * 6 + 1);
        }
      }
    }, addModifiers = function(className){
      var index = $scope.charClasses.indexOf($scope.charClass);
      // change this if you change number of modifiers
      for(var i = 0; i < 2; i++) {
        $scope.charStats[$scope.statModifiers[index][i]]++;
      }
    };
    rollDice();
    addModifiers();
  }]);
})();

