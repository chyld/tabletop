'use strict';

var join = require('./join'),
    chat = require('./chat');

module.exports = function(socket){
  socket.emit('online');
  socket.on('join', join);
  socket.on('chat', chat);
};
