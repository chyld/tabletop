'use strict';

module.exports = function(data){
  global.io.to(data.gameId).emit('bReady', data);
};
