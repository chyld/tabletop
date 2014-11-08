'use strict';

var Room = require('../models/room');

exports.create = function(req, res){
  Room.create(req.user._id, req.body, function(err, room){
    res.send({room:room});
  });
};

exports.index = function(req, res){
  Room.all(req.user, function(err, rooms){
    res.send({rooms:rooms});
  });
};
