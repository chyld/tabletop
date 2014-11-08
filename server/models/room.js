'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
    _      = require('lodash');

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
  Room.collection.findOne({_id:_id}, function(err, obj){
    cb(err, _.create(Room.prototype, obj));
  });
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

Room.all = function(cb){
  Room.collection.find().toArray(cb);
};

Room.prototype.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = Room;
