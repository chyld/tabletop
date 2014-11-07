'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = function(url, cb){
  MongoClient.connect(url, function(err, db){
    global.mongodb = db;

    console.log('Express: Database', url);
    if(cb){cb();}
  });
};
