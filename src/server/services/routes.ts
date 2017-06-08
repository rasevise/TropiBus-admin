import * as express from 'express';
import * as db from '../db/pg';

var getAllRoutes = 'SELECT * FROM Route NATURAL JOIN routepath';
var getRoute = 'SELECT * FROM route NATURAL JOIN routepath WHERE route_id = $1';
var updateRoute = 'UPDATE Route SET route_name=$1, route_description=$2 WHERE route_id=$3';
var getBusLocation = 'SELECT gps_latitude, gps_longitude, bus_name FROM bus NATURAL JOIN gps WHERE bus_status=\'Active\'';

export function routes(app: express.Application) {

let _routesURL = '/routes';
app.get(_routesURL, (req, res, next) => {
    console.log('inside routes get');
    res.contentType('application/json');
    db.query(getAllRoutes, null, (err:any, result:any) => {
            if (err) {
              console.error(err); res.send('Error ' + err);
            }else {
            res.json(result.rows);
            }
    });
});

app.get(_routesURL + '/getRoute', (req, res, next) => {
  res.contentType('application/json');
  db.query(getRoute, [req.query.r_id], (err:any, result:any) => {
    if (err) {
      console.error(err); res.send('Error ' + err);
    }else {
    res.json(result.rows);
    }
  });
});

app.put(_routesURL + '/updateRoute', (req, res, next) => {
  db.query(updateRoute,[req.body.route_name, req.body.route_description, req.body.route_id], (err:any, result:any) => {
    if (err) {
      console.error(err); res.send('Error ' + err);
    }else {
      db.query(getAllRoutes, null, (err:any, result:any) => {
        if(err) {
          console.error(err); res.send('Error ' + err);
        }else {
          res.json(result.rows);
        }
      });
    }
  });
});

app.get(_routesURL + '/getBusLocation', (req, res, next) => {
  res.contentType('application/json');
  db.query(getBusLocation, null, (err:any, result:any) => {
    if (err) {
        res.send('Error ' + err);
    }else {
      console.error(result.rows);
      res.json(result.rows);
    }
  });
});

}
