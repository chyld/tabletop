'use strict';

function Boot(game){
  this.game = game;
}

Boot.prototype = {

  preload: function(){
    this.game.load.spritesheet('tilemap', '../../assets/tilemaps/tilemap20x20.jpg', 40, 40);
  },

  create: function(){
    this.game.state.start('menu');
  }
};
