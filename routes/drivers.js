var express = require('express');
var router = express.Router();
var app = express();
    Driver =[
    { id: 1, name: "Juan", lastName: "Juan", username: "juanito",route: "Route A", status: "active"},
    {  id: 2, name: "Pedro", lastName: "Pedro",  username: "pedrito",route: "Route B", status: "active"},
    {  id: 3, name: "Jorge", lastName: "Jorge", username: "georgie",route: "Route C", status: "active"}
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
  var d_route = req.body.route;
  var d_status = req.body.status;

  var newD = ({
    id: Driver.length,
    lastName: d_last,
    name: d_name,
    route: d_route,
    status: d_status,
    username: d_user
  });
  Driver.push(newD);
});

module.exports = router;