var express = require('express');
var router = express.Router();

 buses = [
    {name: "Bus A", driver: "Juan",  route: "Route A", status: "active"},
    {name: "Bus B", driver: "Pedro", route: "Route B", status: "offline"},
    {name: "Bus C", driver: "Jorge",  route: "Route C", status: "offline"}
    ];

router.get('/', function(req, res, next){
    res.contentType('application/json');
    var routesJSON = JSON.stringify(this.buses);
    res.json(this.buses);
});

router.post('/addB', function (req, res, next) {
  var b_name = req.body.name;
  var b_driver = req.body.driver;
  var b_route = req.body.route;
  var b_status = req.body.status;

  var newB = ({
    id: Bus.length,
    name: b_name,
    driver: b_driver,
    route: b_route,
    status: b_status
  });
  Bus.push(newB);
});

router.put('/updateBus', function (req, res, next) {
  var b_name = req.body.name;
  var b_driver = req.body.driver;
  var b_route = req.body.route;
  var b_status = req.body.status;
  var i = req.body.index;

var newB = ({
    id: Bus.length,
    name: b_name,
    driver: b_driver,
    route: b_route,
    status: b_status
  });
  Bus[i] = newD;
});

router.delete('/deleteBus', function (req, res, next) {
    console.log("req.query. = " + req.query.id);
  var index = req.query.index;
  this.Bus.splice(index, 1);
});

module.exports = router;