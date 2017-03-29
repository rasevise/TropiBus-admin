var express = require('express');
var router = express.Router();

 buses = [
    {name: "Bus A", driver: "Juan", route: "Route A", status: "active"},
    {name: "Bus B", driver: "Pedro", route: "Route B", status: "offline"},
    {name: "Bus C", driver: "Jorge", route: "Route C", status: "offline"}
    ];

router.get('/', function(req, res, next){
    res.contentType('application/json');
    var routesJSON = JSON.stringify(this.buses);
    res.json(this.buses);
});

module.exports = router;