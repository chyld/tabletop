'use strict';

var join  = require('./join'),
    chat  = require('./chat'),
    ready = require('./ready');

module.exports = function(socket){
  socket.emit('online');
  socket.on('join', join);
  socket.on('chat', chat);
  socket.on('ready', ready);
};
