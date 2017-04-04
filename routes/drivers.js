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

module.exports = router;