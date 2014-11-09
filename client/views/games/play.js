'use strict';

//global, but defined inside angular contoroller
function Play(game){
  this.game = game;
}

Play.prototype = {
  placePortrait: function(){

  }
};

//global, but defined inside angular contoroller
function DMPlay(game){
  this.game = game;
}

DMPlay.prototype = {
  placePortrait: Play.prototype.placePortrait
};

//global, but defined inside angular contoroller
function PlayerPlay(game){
  this.game = game;
}

PlayerPlay.prototype = {
  placePortrait: Play.prototype.placePortrait
};
