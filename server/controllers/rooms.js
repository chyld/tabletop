'use strict';

var Room = require('../models/room');

exports.create = function(req, res){
  Room.create(req.user, req.body, function(err, room){
    res.send({room:room});
  });
};

exports.index = function(req, res){
  Room.find(function(err, rooms){
    res.send({rooms:rooms});
  });
};
