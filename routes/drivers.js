var express = require('express');
var router = express.Router();
var app = express();
    Driver =[
    { id: 1, name: "Juan", lastName: "Juan", username: "juanito",route: "Route A", status: "active", password: "skate"},
    {  id: 2, name: "Pedro", lastName: "Pedro",  username: "pedrito",route: "Route B", status: "active", password: "vaio"},
    {  id: 3, name: "Jorge", lastName: "Jorge", username: "georgie",route: "Route C", status: "active", password: "router"}
    ]


router.get('/', function(req, res, next){
    res.contentType('application/json');
    var routesJSON = JSON.stringify(this.Driver);
    res.json(this.Driver);
});


router.post('/addD', function (req, res, next) {
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
  this.Driver.push(newD);
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
  this.Driver[i] = newD;
});

router.delete('/deleteDriver', function (req, res, next) {
    console.log("req.query. = " + req.query.id);
  var id = req.query.id;
  this.Driver.splice(this.Driver[id], 1);
});

module.exports = router;