var express = require('express');
var router = express.Router();
const db = require('../server.js');
  var buses = [];

router.get('/', function(req, res, next){
    console.log("getting buses from server: " );
    res.contentType('application/json');
    db.query('SELECT * FROM Bus', sendData);

  function sendData(err, results) {
    console.log("getting buses from server: ");
    buses = results.rows;
    res.json(buses);
  }
});



router.post('/addBus', function (req, res, next) {
  var b_name = req.body.name;
  var b_driver = req.body.driver;
  var b_route = req.body.route;
  var b_status = req.body.status;

  var newB = ({
    id: buses.length,
    name: b_name,
    driver: b_driver,
    route: b_route,
    status: b_status
  });
  buses.push(newB);
});

router.put('/updateBus', function (req, res, next) {
  var b_name = req.body.name;
  var b_driver = req.body.driver;
  var b_route = req.body.route;
  var b_status = req.body.status;
  var i = req.body.index;

var newB = ({
    id: buses.length,
    name: b_name,
    driver: b_driver,
    route: b_route,
    status: b_status
  });
  buses[i] = newB;
});

router.delete('/deleteBus', function (req, res, next) {
  var index = req.query.index;
  this.buses.splice(index, 1);
});

module.exports = router;