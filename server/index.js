'use strict';

var port       = process.env.PORT,
    db         = process.env.DB,
    express    = require('express'),
    app        = express(),
    http       = null,
    connection = require('./sockets/connection');

require('./lib/config')(app);
require('./routes/routes')(app, express);

require('./lib/mongodb')(db, function(){

  http = require('http').Server(app);
  global.io = require('socket.io')(http);
  global.io.on('connection', connection);

  http.listen(port, function(){
    console.log('listening on *:' + port);
  });

});

module.exports = app;
