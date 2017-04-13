var express = require('express');
var router = express.Router();
const db = require('../server.js');

var getAllRoutes = 'SELECT * FROM Route NATURAL JOIN routepath' //ok 
var getRoute = 'SELECT * FROM route NATURAL JOIN routepath WHERE route_id = $1'

routes = [];

router.get('/', function(req, res, next){
    res.contentType('application/json');
    db.query(getAllRoutes, function(err, result) {
            if (err)
             { console.error(err); response.send("Error " + err); }
            else{
            res.json(result.rows);
            }
    });
});

router.get('/getRoute', function(req, res, next){
    res.contentType('application/json');
    db.query(getRoute, [req.query.r_id], function(err, result) {
        if (err)
            { console.error(err); res.send("Error " + err); }
        else{
        res.json(result.rows);
        }
    });
});

module.exports = router;