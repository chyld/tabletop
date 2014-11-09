(function(){
  'use strict';

  angular.module('tabletop')
  .factory('Create', ['$http', function($http){

    function createCharacter(character){
      return $http.post('/charCreate', character);
    }

    function getCharacters(){
      return $http.get('/charList');
    }

    function getCharById(id){
      return $http.get('/char', id);
    }

    function calcCharPortrait(character){
      var paths = [
        {race:'Dwarf', url:'assets/images/racePortraits/dwarf.jpg'},
        {race:'Elf', url:'assets/images/racePortraits/elf.jpg'},
        {race:'Half Elf', url:'assets/images/racePortraits/halfelf.jpg'},
        {race:'Halfling', url:'assets/images/racePortraits/halfling.jpg'},
        {race:'Half Orce', url:'assets/images/racePortraits/halforc.png'},
        {race:'Human', url:'assets/images/racePortraits/human.jpg'},
      ];

      var charPortrait;


      paths.forEach(function(p){
        if(character.race === p.race){
          charPortrait = p.url;
        }
      });

      return charPortrait;
    }

    return {
      createCharacter: createCharacter,
      getCharacters: getCharacters,
      getCharById: getCharById,
      calcCharPortrait: calcCharPortrait
    };

  }]);
})();
