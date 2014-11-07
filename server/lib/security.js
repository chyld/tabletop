'use strict';

var User = require('../models/user');

exports.authenticate = function(req, res, next){
  User.findById(req.session.userId, function(err, user){
    if(user){
      req.user = user;
      next();
    }else{
      res.status(401).end();
    }
  });
};

