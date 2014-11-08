(function(){
  'use strict';

  angular.module('tabletop')
  .factory('Create', ['$http', function($http){
    function createCharacter(character){
      return $http.post('/charCreate', character);
    }

    return {createCharacter: createCharacter};
  }]);
})();
