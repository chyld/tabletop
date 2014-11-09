(function(){
  'use strict';

  angular.module('tabletop')
  .factory('Room', ['$rootScope', '$http', function($rootScope, $http){

    function getRoom(gameId){
      return $http.get('/rooms/' + gameId);
    }

    return {getRoom: getRoom};
  }]);
})();
