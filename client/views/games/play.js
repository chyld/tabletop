'use strict';

//global, but defined inside angular contoroller
function Play(game){
  this.game = game;
}

Play.prototype = {
  create: function(){
   this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tilemap', 3);
  },
  placePortrait: function(){

  }
};

//global, but defined inside angular contoroller
function DMPlay(game){
  this.game = game;
}

DMPlay.prototype = {
  create: Play.prototype.create,
  update: function(){
    console.log('DM');
  },
  placePortrait: Play.prototype.placePortrait
};

//global, but defined inside angular contoroller
function PlayerPlay(game){
  this.game = game;
}

PlayerPlay.prototype = {
  create: Play.prototype.create,
  update: function(){
    console.log('Player');
  },
  placePortrait: Play.prototype.placePortrait
};
