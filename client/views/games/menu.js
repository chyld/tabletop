/* jshint unused:false */
'use strict';

function Menu(game){
  this.game = game;
}

Menu.prototype = {
  create: function(){
    var bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tilemap', 3);

  },

  update: function(){

  }

};
