(function(){
  'use strict';

  angular.module('tabletop')
  .directive('nsNav', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ns-nav/ns-nav.html';
    o.scope       = {};
    o.controller  = ['$scope', 'User', function($scope, User){
                      $scope.$on('email', function(e, email){
                        $scope.email = email;
                      });

                      $scope.connected = false;

                      window.addEventListener('connected', function(){
                        $scope.connected = true;
                      });

                      User.getEmailFromStorage();
                    }];
    return o;
  }]);
})();
