'use strict';

module.exports = function(data){
  var socket = this;
  socket.join(data.gameId);
};
