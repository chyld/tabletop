'use strict';

var Character = require('../models/character');

exports.create = function(req, res){
  Character.create(req.body, req.user._id, function(err, charSaved){
    res.status(200).end();
  });
};
