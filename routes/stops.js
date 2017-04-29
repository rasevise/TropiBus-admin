var express = require('express');
var router = express.Router();
const db = require('../server.js');

var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop NATURAL JOIN route WHERE route_id=$1'
var createStop = 'INSERT INTO Stop(stop_name,stop_description,stop_latitude,stop_longitude) VALUES($1,$2,$3,$4) RETURNING stop_id'
var asignStopToRoute = 'INSERT INTO route_stop(route_id, stop_id) VALUES($1,$2)'
var deleteStop = 'DELETE FROM Stop WHERE stop_id=$1'
var updateStop = 'UPDATE stop SET stop_name=$1, stop_description=$2 WHERE stop_id=$3'

stops = [];

// router.get('/', function(req, res, next){
//     res.contentType('application/json');
//     var routesJSON = JSON.stringify(this.stops);
//     res.json(this.stops);
// });

router.get('/getStopsFromRoute', function(req, res, next) {//Parameter: Route ID
    // console.log('Print all Stopf from a specific route')
    // console.log('Route ID: ', req.query.r_id)
    db.query(getStopsFromRoute,[req.query.r_id], function(err, result) {
        if (err)
            { console.error(err); res.send("Error " + err); }
        else{
        res.json(result.rows);
        }
    });
});

router.put('/updateStop', function (req, res, next) {
    var stop_name = req.body.stop_name;
    var stop_description = req.body.stop_description;
    var stop_id = req.body.s_id;
    db.query(updateStop,[stop_name ,stop_description, stop_id] ,function(err, result) {
        if (err){ 
            console.error(err); res.send("Error" + err); 
        }
        else {
            res.json(result.rows);
        }
    });
});

router.post('/createStop', function(req, res, next) {
    var stop_name = req.body.stop_name;
    var stop_description = req.body.stop_description;
    var stop_latitude = req.body.stop_latitude;
    var stop_longitude = req.body.stop_longitude;
    var routeID = req.body.r_id;
    db.query(createStop,[stop_name ,stop_description, stop_latitude, stop_longitude] ,function(err, result) {
        stopID = result.rows[0].stop_id;
        console.log("Stop ID: " + stopID + " Route ID: " + routeID)
        if (err){ 
            console.error(err); 
            res.send("Error " + err); 
        }
        db.query(asignStopToRoute, [routeID, stopID], function(err, result){
        if(err){ 
            console.error(err); 
            res.send("Error " + err); 
        }
        else{
            res.send(result);
        }
        });
    });
});

router.delete('/deleteStop', function (req, res, next) {
    var r_id = req.query.r_id;
    db.query(deleteStop,[req.query.stop_id] ,function(err, result) {
        if (err){ 
            console.error(err); res.send("Error " + err); 
        }
        else {
            res.send(result);
        }
    });
});

module.exports = router;