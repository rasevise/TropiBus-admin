var express = require('express');
var router = express.Router();
const db = require('../server.js');

var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop NATURAL JOIN route WHERE route_id=$1'
var createStop = 'INSERT INTO Stop(stop_name,stop_description,stop_latitude,stop_longitude)VALUES($1,$2,$3,$4)'

stops = [];

router.get('/', function(req, res, next){
    res.contentType('application/json');
    var routesJSON = JSON.stringify(this.stops);
    res.json(this.stops);
});

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
//   var m_title = req.body.title;
//   var m_mess = req.body.messageContent;
//   var i = req.body.index;

//   var newD = ({
//     id: Message.length,
//     title: m_title,
//     messageContent: m_mess
//   });
//   Message[i] = newD;
});

router.post('/createStop', function(req, res, next) {
    var stop = req.body.stop;

    console.log('CREATE STOP')
    console.log('Stop Name '+req.body.stop_name)
    console.log('Stop Description ', req.body.stop_description)
    console.log('Stop Latitude ', req.body.stop_latitude)
    console.log('Stop Longitude ', req.body.stop_longitude)
    db.query(createStop,[stop.name ,stop.description, stop.latitude, stop.longitude] ,function(err, result) {
    
        
        if (err){ 
            console.error(err); response.send("Error " + err); }
        else{
            client.query(getAllStops, function(err, result){
            
            if(err){ 
                console.error(err); response.send("Error " + err); }
            else{
                result.json(res.rows);
                }
        });
        }
    });
});

router.delete('/deleteStop', function (req, res, next) {
    client.query(deleteStop,[req.query.stop_id] ,function(err, result) {
        if (err){ 
            console.error(err); response.send("Error " + err); }
        else{
            db.query(getAllStops, function(err, result){
                if(err){ 
                    console.error(err); response.send("Error " + err); }
                else{
                    result.json(result.rows);
                }
            });
        }
    });
});

module.exports = router;