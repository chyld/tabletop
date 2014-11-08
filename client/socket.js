/* global io */

var socket;

(function(){
  'use strict';

  socket = io.connect('/');

  socket.on('online', function(){
    window.dispatchEvent(new Event('connected'));
  });
})();
