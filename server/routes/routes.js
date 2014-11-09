'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    rooms          = require('../controllers/rooms'),
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
  app.get('/char', characters.find);

  //authenticated user
  app.use(security.authenticate);
  app.use(debug.info);

  app.delete('/logout', users.logout);
  app.post('/rooms', rooms.create);
  app.get('/rooms', rooms.index);
  app.post('/rooms/:roomId/join', rooms.join);
  app.get('/rooms/:roomId', rooms.get);
  app.delete('/rooms/:roomId', rooms.destroy);
  app.get('/charList', characters.list);
  app.get('/char', characters.find);
  app.post('/charCreate', characters.create);

  console.log('Express: Routes Loaded');
};
