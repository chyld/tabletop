'use strict';

function Boot(game){
  this.game = game;
}

Boot.prototype = {

  preload: function(){
    this.game.load.spritesheet('tilemap', '../assets/tilemaps/tilemap20x20.jpg', 20, 20);
  },

  create: function(){
    console.log('boot menu');
    //game.state.start('menu');
  }
};
