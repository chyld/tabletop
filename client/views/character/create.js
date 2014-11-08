(function(){
  'use strict';

  angular.module('tabletop')
  .controller('CharCtrl', ['$scope', '$state', '$http', 'User', function($scope, $state, $http, User){

    $scope.charOptions = [
          {value: 'barbarian', name: 'barbarian', label: 'Barbarian'},
          {value: 'bard', name: 'bard', label: 'Bard'},
          {value: 'cleric', name: 'cleric', label: 'Cleric'},
          {value: 'druid', name: 'druid', label: 'Druid'},
          {value: 'fighter', name: 'fighter', label: 'Fighter'},
          {value: 'monk', name: 'monk', label: 'Monk'},
          {value: 'paladin', name: 'paladin', label: 'Paladin'},
          {value: 'ranger', name: 'ranger', label: 'Ranger'},
          {value: 'wizard', name: 'wizard', label: 'Wizard'}
    ];
    $scope.raceOptions = [
          {value: 'human', name: 'human', label: 'Human'},
          {value: 'elf', name: 'elf', label: 'Elf'},
          {value: 'dwarf', name: 'dwarf', label: 'Dwarf'},
          {value: 'halfling', name: 'halfling', label: 'Halfling'},
          {value: 'half-elf', name: 'half-elf', label: 'Half Elf'},
          {value: 'half-org', name: 'half-org', label: 'Half Orc'},
          {value: 'gnome', name: 'gnome', label: 'Gnome'}
    ];

    // change charClass to be dynamic
    $scope.charClass = $scope.charOptions[1];
    $scope.charClasses = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'wizard'];
    $scope.statModifiers = [['con', 'con'], ['cha', 'cha'], ['int', 'wis'], ['int', 'con'], ['str', 'str'], ['con', 'wis'], ['str', 'int'], ['dex', 'con'], ['dex', 'dex'], ['wiz', 'wiz']];
    $scope.statNames = ['str', 'dex', 'con', 'cha', 'int', 'wis'];
    $scope.charStats = {
      str: 0,
      dex: 0,
      con: 0,
      cha: 0,
      int: 0,
      wis: 0
    };
    $scope.charMods = {
      str: 0,
      dex: 0,
      con: 0,
      cha: 0,
      int: 0,
      wis: 0
    };

    function rollDice(){
      for(var i = 0; i < $scope.statNames.length; i++) {
        for(var j = 0; j < 3; j++) {
          $scope.charStats[$scope.statNames[i]] += Math.floor(Math.random() * 6 + 1);
        }
      }
    }

    function addModifiers(className){
      var index = $scope.charClasses.indexOf($scope.charClass.value);
      // change this if you change number of modifiers

      for(var i = 0; i < 2; i++) {
        $scope.charStats[$scope.statModifiers[index][i]]++;
        $scope.charMods[$scope.statModifiers[index][i]]++;
      }
    }

    function resetRoll(){
      $scope.charStats = {
        str: 0,
        dex: 0,
        con: 0,
        cha: 0,
        int: 0,
        wis: 0
      };
      $scope.charMods = {
        str: 0,
        dex: 0,
        con: 0,
        cha: 0,
        int: 0,
        wis: 0
      };
    }

    $scope.roll = function(){
      resetRoll();
      rollDice();
      addModifiers();
    };

    $scope.submit = function(){
      console.log($scope);
      //$http.post('/rooms', $scope.room);
    };
  }]);
})();

