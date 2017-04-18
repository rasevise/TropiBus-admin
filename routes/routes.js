var express = require('express');
var router = express.Router();
const db = require('../server.js');

var getAllRoutes = 'SELECT * FROM Route NATURAL JOIN routepath' //ok 
var getRoute = 'SELECT * FROM route NATURAL JOIN routepath WHERE route_id = $1'
var updateRoute = 'UPDATE Route SET route_name=$1, route_description=$2, route_area=$3 WHERE route_id=$4'//ok

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

router.put('/updateRoute', function (req, res, next) {
    db.query(updateRoute,[req.body.route_name, req.body.route_description,req.body.route_area, req.body.route_id] ,function(err, result) {
        if (err){ 
            console.error(err); response.send("Error " + err); 
        }
        else {
            db.query(getAllRoutes, function(err, result){

                if(err){ 
                    console.error(err); response.send("Error " + err); 
                }
                else{
                res.json(result.rows); 
                }
            });
        }
    });
});

module.exports = router;