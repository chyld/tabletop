'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    users          = require('../controllers/users'),
    characters     = require('../controllers/character');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore({url:process.env.REDIS_URL}), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  //guest user id
  app.post('/register', users.register);
  app.post('/login', users.login);

  //authenticated user
  app.use(security.authenticate);
  app.use(debug.info);
  app.delete('/logout', users.logout);
  app.post('/charCreate', characters.create);

  console.log('Express: Routes Loaded');
};
