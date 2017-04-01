var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var routes = require('./routes/routes');
var buses = require('./routes/buses');
// var stops = require('./routes/stops');

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
app.use('/routesjson', routes);
app.use('/buses', buses);


app.listen(port, function(){
    console.log('Server started on port '+port);
});