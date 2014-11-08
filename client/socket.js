/* global io */

(function(){
  'use strict';

  var socket = io.connect('/');

  socket.on('online', function(){
    window.dispatchEvent(new Event('connected'));
  });
})();
