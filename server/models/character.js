'use strict';

var Mongo = require('mongodb');


function Character(o, userId){
  this.name      = o.name;
  this.userId    = Mongo.ObjectID(userId); //recast into Mongo objectID
  this.sex       = o.sex;
  this.charClass = o.charClass;
  this.race      = o.race;
  this.abilities = o.abilities;
  this.hp        = (Math.floor(Math.random() * 30) + 1) + calcMiscMods(o.abilities.con);
  this.weapon    = o.weapon;
  this.armor     = calcArmor(o.armor.label);
  this.skills    = o.skills;
  this.feats     = o.feats;
  this.portrait  = o.portrait;

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
  newCharacter = addExtraMods(newCharacter);
  newCharacter = chooseWeapon(newCharacter);
  //save to Mongo collection
  Character.collection.save(newCharacter, cb);
};

Character.list = function(id, cb){
  var userId = Mongo.ObjectID(id);
  Character.collection.find({userId: userId}).toArray(function(err, list){
    cb(err, list);
  });
};

Character.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Character.collection.findOne({_id:_id}, cb);
};

module.exports = Character;


//hard coded for level 1 characters only
function addExtraMods(character){
  if(character.charClass.label === 'Barbarian'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Fast Movement', 'Illiteracy', 'Rage 1/Day'];
  }
  if(character.charClass.label === 'Bard'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 0 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 2 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Bardic Music', 'Bardic Knowledge', 'Countersong', 'Fascinate', 'Inspire Courage + 1'];
    character.spellsPerDay         = {'0': 2};
    character.spellsKnown          = {'0': 4};
  }
  if(character.charClass.label === 'Cleric'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 2 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Turn Undead'];
    character.spellsPerDay         = {'0': 3, '1st': '1+1'};
  }
  if(character.charClass.label === 'Druid'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 2 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Animal companion', 'Nature Sense', 'Wild Empathy'];
    character.spellsPerDay         = {'0': 3, '1st': 1};
  }
  if(character.charClass.label === 'Fighter'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = [];
  }
  if(character.charClass.label === 'Monk'){
    character.abilities.bab        = 2;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Bonus Feat', 'Flurry of Blows', 'Unarmed Strike'];
  }
  if(character.charClass.label === 'Paladin'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Aura of Good', 'Detect Evil', 'Smite Evil 1/day'];
    character.spellsPerDay          = 0;
  }
  if(character.charClass.label === 'Ranger'){
    character.abilities.bab        = 1;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['1st Favored Enemy', 'Track', 'Wild Empathy'];
    character.spellsPerDay         = 0;
  }
  if(character.charClass.label === 'Rogue'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 2 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 0 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Sneak Attack 1d6', 'Trapfinding'];
    character.spellsPerDay         = 0;
  }
  if(character.charClass.label === 'Wizard'){
    character.abilities.bab        = 0;
    character.abilities.fortitude  = 0 + calcMiscMods(character.abilities.con);
    character.abilities.will       = 2 + calcMiscMods(character.abilities.wis);
    character.abilities.reflex     = 0 + calcMiscMods(character.abilities.dex);
    character.abilities.init       = Math.floor(Math.random() * 20 + 1) + calcMiscMods(character.abilities.dex);
    character.classSkills          = ['Summon Familiar', 'Scribe Scroll'];
    character.spellsPerDay         = {'0': 3, '1st': 1};
    character.spells               = [{name: 'Mage Armor', property: '+4 Armor Bonus'}, {name: 'Magic Missile' , property: '1d4+1'}];
  }

  return character;
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
  }else{
    return 0;
  }
}

function chooseWeapon(character){
  if(character.weapon.label === 'Sword'){
    character.weapon = {name: 'Short Sword', damage:'1d6'};
  }
  if(character.weapon.label === 'Great Sword'){
    character.weapon = {name: 'Greatsword', damage:'2d6'};
  }
  if(character.weapon.label === 'Dagger'){
    character.weapon = {name: 'Dagger', damage:'1d6'};
  }
  if(character.weapon.label === 'Bow'){
    character.weapon = {name: 'Longbow', damage:'1d10'};
  }
  if(character.weapon.label === 'Staff'){
    character.weapon = {name: 'Staff', damage:'2d6'};
  }

  return character;
}

function calcArmor(armor){
  var armorStats = {};
  if(armor === 'Robe'){
    armorStats.shieldBonus       = 1;
    armorStats.maxDexBonus       = 8;
    armorStats.armorCheckPenalty = 0;
    armorStats.spellFail         = 0;
  }
  if(armor === 'Leather Armor'){
    armorStats.shieldBonus       = 2;
    armorStats.maxDexBonus       = 6;
    armorStats.armorCheckPenalty = 0;
    armorStats.spellFail         = 0.1;
  }
  if(armor === 'Chain Mail'){
    armorStats.shieldBonus       = 5;
    armorStats.maxDexBonus       = 2;
    armorStats.armorCheckPenalty = -5;
    armorStats.spellFail         = 0.3;
  }
  if(armor === 'Plate Armor'){
    armorStats.shieldBonus       = 8;
    armorStats.maxDexBonus       = 1;
    armorStats.armorCheckPenalty = -6;
    armorStats.spellFail         = 0.35;
  }
}

