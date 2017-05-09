import * as express from 'express';
import * as db from '../db/pg';

var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop NATURAL JOIN route WHERE route_id=$1 ORDER BY stop_order';
var createStop = 'INSERT INTO Stop(stop_name,stop_description,stop_latitude,stop_longitude) VALUES($1,$2,$3,$4) RETURNING stop_id';
var asignStopToRoute = 'INSERT INTO route_stop(route_id, stop_id) VALUES($1,$2)';
var deleteStop = 'DELETE FROM Stop WHERE stop_id=$1';
var updateStop = 'UPDATE stop SET stop_name=$1, stop_description=$2 WHERE stop_id=$3';
var updateStopOrder = 'UPDATE stop SET stop_order=$1 WHERE stop_id=$2';

export function stops(app: express.Application) {
  let _stopsURL = '/stops';
// router.get('/', function(req, res, next){
//     res.contentType('application/json');
//     var routesJSON = JSON.stringify(this.stops);
//     res.json(this.stops);
// });

app.get(_stopsURL + '/getStopsFromRoute', (req, res, next) => {//Parameter: Route ID
    // console.log('Print all Stopf from a specific route')
    // console.log('Route ID: ', req.query.r_id)
    db.query(getStopsFromRoute,[req.query.r_id], function(err:any, result:any) {
        if (err) {
          console.error(err); res.send('Error ' + err);
        }else {
        res.json(result.rows);
        }
    });
});

app.put(_stopsURL + '/updateStop', function (req, res, next) {
    var stop_name = req.body.stop_name;
    var stop_description = req.body.stop_description;
    var stop_id = req.body.s_id;
    db.query(updateStop,[stop_name ,stop_description, stop_id] , (err:any, result:any) => {
        if (err) {
            console.error(err); res.send('Error' + err);
        }else {
            res.json(result.rows);
        }
    });
});

app.put(_stopsURL + '/updateStopOrder', (req, res, next) => {
    var stops = req.body;
    console.log(stops);
    for (let i = 0; i < stops.length; i++) {
        db.query('UPDATE stop SET stop_order=$1 WHERE stop_id=$2',[i, stops[i].id] , (err:any, result:any) => {
            if (err) {
                console.error(err); res.send('Error' + err);
            }
        });
    }

});

app.post(_stopsURL + '/createStop', (req, res, next) => {
    var stop_name = req.body.stop_name;
    var stop_description = req.body.stop_description;
    var stop_latitude = req.body.stop_latitude;
    var stop_longitude = req.body.stop_longitude;
    var routeID = req.body.r_id;
    db.query(createStop,[stop_name ,stop_description, stop_latitude, stop_longitude] , (err:any, result:any) => {
        let stopID = result.rows[0].stop_id;
        if (err) {
            console.error(err);
            res.send('Error ' + err);
        }
        db.query(asignStopToRoute, [routeID, stopID], (err:any, result:any) => {
        if(err) {
            console.error(err);
            res.send('Error ' + err);
        }else {
            res.send(result);
        }
        });
    });
});

app.delete(_stopsURL + '/deleteStop', (req, res, next) => {
    var r_id = req.query.r_id;
    db.query(deleteStop,[req.query.stop_id] , (err:any, result:any) => {
        if (err) {
            console.error(err); res.send('Error ' + err);
        }else {
            res.send(result);
        }
    });
});

}
