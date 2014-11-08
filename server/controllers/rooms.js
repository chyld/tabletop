'use strict';

var Room = require('../models/room');

exports.create = function(req, res){
  Room.create(req.user, req.body, function(err, room){
    res.send({room:room});
  });
};

exports.index = function(req, res){
  Room.all(function(err, rooms){
    res.send({rooms:rooms});
  });
};

exports.join = function(req, res){
  Room.findById(req.params.roomId, function(err, room){
    var isAuthenticated = room.authenticate(req.body.password);
    res.send({isAuthenticated:isAuthenticated});
  });
};

exports.destroy = function(req, res){
  Room.destroy(req.params.roomId, req.user._id, function(){
    Room.all(function(err, rooms){
      res.send({rooms:rooms});
    });
  });
};
