var express = require('express');
var router = express.Router();
const db = require('../server.js');
    var Driver =[];


router.get('/', function(req, res, next){
    console.log("getting messages from server: " );
    res.contentType('application/json');
    db.query('SELECT * FROM Driver', sendData);
    
      function sendData(err, results) {
    console.log("getting drivers from server: ");
    Driver = results.rows;
    res.json(Driver);
  }
});


router.post('/addDriver', function (req, res, next) {
  var d_name = req.body.name;
  var d_last = req.body.lastName;
  var d_user = req.body.username;
  var d_password = req.body.password
  var d_route = req.body.route;
  var d_status = req.body.status;

  var newD = ({
    id: this.Driver.length,
    lastName: d_last,
    name: d_name,
    password : d_password,
    route: d_route,
    status: d_status,
    username: d_user
  });
  Driver.push(newD);
});

router.put('/updateDriver', function (req, res, next) {
  var d_name = req.body.name;
  var d_last = req.body.lastName;
  var d_user = req.body.username;
  var d_password = req.body.password;
  var d_route = req.body.route;
  var d_status = req.body.status;;
  var i = req.body.index;

  var newD = ({
        id: Driver.length,
    lastName: d_last,
    name: d_name,
    password : d_password,
    route: d_route,
    status: d_status,
    username: d_user
  });
  Driver[i] = newD;
});

router.delete('/deleteDriver', function (req, res, next) {
    console.log("req.query. = " + req.query.index);
  var index = req.query.index;
  this.Driver.splice(index, 1);
});

module.exports = router;