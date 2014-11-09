/* jshint unused:false */
'use strict';

function Menu(game){
  this.game = game;
}

Menu.prototype = {
  create: function(){
   this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tilemap', 3);
   this.game.state.start('play');
  }
};

function DMMenu(game){
  this.game = game;
}

DMMenu.prototype = {
  create: Menu.prototype.create
};

function PlayerMenu(game){
  this.game = game;
}

PlayerMenu.prototype = {
  create: Menu.prototype.create
};
