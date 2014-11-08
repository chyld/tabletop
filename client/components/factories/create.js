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

    return {
      createCharacter: createCharacter,
      getCharacters: getCharacters,
      getCharById: getCharById
    };

  }]);
})();
