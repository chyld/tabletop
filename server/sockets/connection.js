'use strict';

var join = require('./join');

module.exports = function(socket){
  socket.emit('online');
  socket.on('join', join);
};
