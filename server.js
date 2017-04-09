var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var debug = require('debug')('http');
var http = require('http');
var errorHandler = require('errorhandler');
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
app.use(errorHandler({ dumpExceptions: true, showStack: true })); 


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
