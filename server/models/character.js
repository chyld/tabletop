'use strict';

var Mongo = require('mongodb');


function Character(o, userId){
  this.name      = o.name;
  this.userId    = Mongo.ObjectID(userId); //recast into Mongo objectID
  this.sex       = o.sex;
  this.charClass = o.charClass;
  this.abilities = o.abilities;
  this.hp        = (Math.floor(Math.random() * 30) + 1) + calcMiscMods(o.abilities.con); //5d6 
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

module.exports = Character;


//hard coded for level 1 characters only
function addExtraMods(character){
  if(character.charClass === 'Barbarian'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Fast Movement', 'Illiteracy', 'Rage 1/Day'];
  }
  if(character.charClass === 'Bard'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 0 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 2 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Bardic Music', 'Bardic Knowledge', 'Countersong', 'Fascinate', 'Inspire Courage + 1'];
    character.spellsPerDay         = {'0': 2};
    character.spellsKnown          = {'0': 4};
  }
  if(character.charClass === 'Cleric'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 2 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Turn Undead'];
    character.spellsPerDay         = {'0': 3, '1st': '1+1'};
  }
  if(character.charClass === 'Druid'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 2 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Animal companion', 'Nature Sense', 'Wild Empathy'];
    character.spellsPerDay         = {'0': 3, '1st': 1};
  }
  if(character.charClass === 'Fighter'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = [];
  }
  if(character.charClass === 'Monk'){
    character.abilities.bab        = 2;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Bonus Feat', 'Flurry of Blows', 'Unarmed Strike'];
  }
  if(character.charClass === 'Paladin'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Aura of Good', 'Detect Evil', 'Smite Evil 1/day'];
    character.spellsPerDay          = 0;
  }
  if(character.charClass === 'Ranger'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['1st Favored Enemy', 'Track', 'Wild Empathy'];
    character.spellsPerDay         = 0;
  }
  if(character.charClass === 'Rogue'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Sneak Attack 1d6', 'Trapfinding'];
    character.spellsPerDay         = 0;
  }
  if(character.charClass === 'Wizard'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 0 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = (Math.floor(Math.random() * 20) + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Summon Familiar', 'Scribe Scroll'];
    character.spellsPerDay         = {'0': 3, '1st': 1};
  }
}

//this is for fortitude, will, reflex
function calcMiscMods(stat){
  if(stat >= 12 && stat <= 13){
    return 1;
  }
  if(stat >= 14 && stat <= 15){
    return 2;
  }
  if(stat >= 16 && stat <= 17){
    return 3;
  }
}