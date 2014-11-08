(function(){
  'use strict';

  angular.module('tabletop')
  .controller('HomeCtrl', ['$scope', function($scope){
    $('body').css('background-image', 'url("/assets/bomb-icon.png")');
  }]);
})();
