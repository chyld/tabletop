'use strict';

var Character = require('../models/character');

exports.create = function(req, res){
  Character.create(req.body, req.user._id, function(err, charSaved){
    res.status(200).end();
  });
};

exports.list = function(req, res){
  Character.list(req.user._id, function(err, list){
    res.send({list: list});
  });
};

exports.find = function(req, res){
  Character.findById(req.id, function(err, character){
    res.send({character: character});
  });
};
