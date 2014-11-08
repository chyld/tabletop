'use strict';

var Mongo = require('mongodb');


function Character(o, userId){
  this.name      = o.name;
  this.userId    = Mongo.ObjectID(userId); //recast into Mongo objectID
  this.sex       = o.sex;
  this.class     = o.class;
  this.abilities = o.abilities;
  this.hp        = o.hp;
  this.weapons   = o.weapons;
  this.armor     = o.armor;
  this.shield    = o.shield || {}; //certain classes do not get a shield
  this.skills    = o.skills;
  this.feats     = o.feats;


  //default empty attributes
  this.money     = 100;
  this.inventory = []; //array of objects during play
}

//getter for Character collection
Object.defineProperty(Character, 'collection', {
  get: function(){return global.mongodb.collection('character');}
});


Character.create = function(character, userId, cb){
  var newCharacter = new Character(character, userId);
  //add class modifiers, reflex, save, base attack bonus, initiative, will
  newCharacter = classModifier(newCharacter);
  //save to Mongo collection
  Character.collection.save(newCharacter, cb);
};


function classModifier(character){
  if(character.class === 'Barbarian'){
    character
  }
}


module.exports = Character;

