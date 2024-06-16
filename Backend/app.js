// app.js

var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./db/connection');
var routes = require('./Routes/routes');
var cors = require('cors');

var app = express();
app.use(cors()); 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

connection.init();
routes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
