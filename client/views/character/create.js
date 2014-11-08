(function(){
  'use strict';

  angular.module('tabletop')
  .controller('CharCtrl', ['$scope', '$state', '$http', 'User', 'Create', function($scope, $state, $http, User, Create){
    $scope.featPoints = 2;

    $scope.charOptions = [
          {value: 'barbarian', label: 'Barbarian'},
          {value: 'bard', label: 'Bard'},
          {value: 'cleric', label: 'Cleric'},
          {value: 'druid', label: 'Druid'},
          {value: 'fighter', label: 'Fighter'},
          {value: 'monk', label: 'Monk'},
          {value: 'paladin', label: 'Paladin'},
          {value: 'ranger', label: 'Ranger'},
          {value: 'wizard', label: 'Wizard'}
    ];
    $scope.raceOptions = [
          {value: 'human', label: 'Human'},
          {value: 'elf', label: 'Elf'},
          {value: 'dwarf', label: 'Dwarf'},
          {value: 'halfling', label: 'Halfling'},
          {value: 'half-elf', label: 'Half Elf'},
          {value: 'half-org', label: 'Half Orc'},
          {value: 'gnome', label: 'Gnome'}
    ];
    $scope.weaponOptions = [
      {value: 'sword', label: 'Sword'},
      {value: 'great-sword', label: 'Great Sword'},
      {value: 'bow', label: 'Bow'},
      {value: 'dagger', label: 'Dagger'},
      {value: 'staff', label: 'Staff'}
    ];
    $scope.armorOptions = [
      {value: 'chain', label: 'Chain Mail'},
      {value: 'leather', label: 'Leather Armor'},
      {value: 'plate', label: 'Plate Armor'}
    ];
    $scope.featOptions = [
      {value: 'agile', label: 'Agile'},
      {value: 'endurance', label: 'Endurance'},
      {value: 'iron-will', label: 'Iron Will'}
    ];

    $scope.assignPoints = function(param){
      if($scope.featPoints === 0){
        param = param;
      }
      console.log(param);
    };


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
      //should only be using character.charClass, not charClass.value
      var index = $scope.charClasses.indexOf($scope.character.charClass.value);
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

    $scope.character = {
      name: null,
      sex: null,
      charClass: $scope.charOptions[0],
      race: null,
      abilities: $scope.charStats,
      weapon: null,
      armor: null,
      skills: null,
      feat: null
    };

    $scope.roll = function(){
      resetRoll();
      rollDice();
      addModifiers();
      $scope.character.abilities = $scope.charStats;
      //console.log($scope.character);
    };

    $scope.submit = function(){
      //console.log($scope.character);
      Create.createCharacter($scope.character).then(success, failure);
    };

    function success(){
      console.log('saved');
    }

    function failure(){
      console.log('failed');
    }
  }]);
})();

