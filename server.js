var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var debug = require('debug')('http');
var http = require('http');
var pg = require('pg');

var client = new pg.Client({
  user: 'wymxggcwikpwav', //env var: PGUSER
  database: 'dd0arpc8l5k2be', //env var: PGDATABASE
  password: '203bccfd54e249de1659cdcb1d99cac0f82a14eb9246b51bbef0c1598c46089d', //env var: PGPASSWORD
  host: 'ec2-54-83-205-71.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  ssl: true
}); 
client.connect();

//route models
var index = require('./routes/index');
var routes = require('./routes/routes');
var buses = require('./routes/buses');
var stops = require('./routes/stops');
var drivers = require('./routes/drivers');
var messages = require('./routes/messages');


var port = process.env.PORT || 8080;
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Route Services
app.use('/', index);
app.use('/routes', routes);
app.use('/buses', buses);
app.use('/stops', stops);
app.use('/drivers', drivers);
app.use('/messages', messages);


http.createServer(app).listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

client.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return client.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return client.connect(callback);
};