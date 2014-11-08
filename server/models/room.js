'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function Room(o, userId){
  this.name = o.name;
  this.password = bcrypt.hashSync(o.password, 10);
  this.userId = userId;
}

Object.defineProperty(Room, 'collection', {
  get: function(){return global.mongodb.collection('rooms');}
});

Room.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Room.collection.findOne({_id:_id}, cb);
};

Room.create = function(userId, o, cb){
  Room.collection.findOne({userId:userId, name:o.name}, function(err, room){
    if(room){
      cb();
    } else {
      o.userId = userId;
      Room.collection.save(o, cb);
    }
  });
};

Room.find = function(cb){
  Room.collection.find().toArray(cb);
};

module.exports = Room;
