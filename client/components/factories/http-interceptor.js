(function(){
  'use strict';

  angular.module('tabletop')
  .factory('HttpInterceptor', ['$rootScope', '$q', function($rootScope, $q){

    function request(req){
      return req;
    }

    function response(res){
      return res;
    }

    function requestError(req){
      return $q.reject(req);
    }

    function responseError(res){
      if(res.status === 401){
        $rootScope.$broadcast('unauthorized');
      }

      return $q.reject(res);
    }

    return {request:request, response:response, requestError:requestError, responseError:responseError};
  }]);
})();

