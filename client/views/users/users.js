(function(){
  'use strict';

  angular.module('tabletop')
  .controller('UsersCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
    $('#email').focus();
    $scope.user = {};
    $scope.mode = $state.current.name;

    if($scope.mode === 'logout'){
      User.logout().then(function(){
        toastr.success('User successfully logged out.');
        $state.go('home');
      });
    }

    $scope.submit = function(){
      if($scope.userForm.$valid){
        if($scope.mode === 'register'){
          User.register($scope.user).then(function(response){
            toastr.success('User successfully registered.');
            $state.go('login');
          }, function(){
            toastr.error('Error during registration.');
            $scope.user = {};
          });
        }else{
          User.login($scope.user).then(function(response){
            toastr.success('User successfully logged in.');
            $state.go('home');
          }, function(){
            toastr.error('Error during login.');
            $scope.user = {};
          });
        }
      }
    };
  }]);
})();

