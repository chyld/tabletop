(function(){
  'use strict';

  angular.module('tabletop')
  .controller('RoomsCtrl', ['$scope', '$http', function($scope, $http){
    $scope.room = {};

    $scope.submit = function(){
      $http.post('/rooms', $scope.room);
    };
  }]);
})();
