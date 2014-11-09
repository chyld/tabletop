/* jshint unused:false */
'use strict';

function Menu(game){
  this.game = game;
}

Menu.prototype = {
  create: function(){
    console.log('create');
    var bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tilemap', 3);

  }
};

function DMMenu(game){
  this.game = game;
}

DMMenu.prototype = {
  create: Menu.prototype.create,

  update: function(){
    console.log('DM');
  }

};

function PlayerMenu(game){
  this.game = game;
}

PlayerMenu.prototype = {
  create: Menu.prototype.create,

  update: function(){
    console.log('Player');
  }

};
