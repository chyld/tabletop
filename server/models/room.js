'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function Room(o, user){
  this.name = o.name;
  this.password = bcrypt.hashSync(o.password, 10);
  this.userId = user._id;
  this.email = user.email;
}

Object.defineProperty(Room, 'collection', {
  get: function(){return global.mongodb.collection('rooms');}
});

Room.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Room.collection.findOne({_id:_id}, cb);
};

Room.create = function(user, o, cb){
  Room.collection.findOne({userId:user._id, name:o.name}, function(err, room){
    if(room){
      cb();
    }else{
      room = new Room(o, user);
      Room.collection.save(room, cb);
    }
  });
};

Room.find = function(cb){
  Room.collection.find().toArray(cb);
};

module.exports = Room;
