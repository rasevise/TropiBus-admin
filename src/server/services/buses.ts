import * as express from 'express';
import * as db from '../db/pg';

export function buses(app: express.Application) {

let _busesURL = '/buses';

app.get(_busesURL, (req, res, next) => {
    console.log('getting buses from server: ');
    res.contentType('application/json');
    db.query('SELECT * FROM Bus NATURAL LEFT JOIN Driver ORDER BY bus_status', null,  (err:any, results:any) => {
      if (err) {
         console.error(err);
         res.send('Error ' + err);
      } else{
      res.json(results.rows);
      }
    });
});


app.post(_busesURL + '/addBus', (req, res, next) => {

    console.log('Create a bus');
    var id = 0;
    var status;

    db.query('INSERT INTO GPS(gps_latitude, gps_longitude) VALUES(0,0) RETURNING gps_id', null, (err:any, res1:any) => {
      if (err) {
           console.error( err);
            res1.send('Error ' + err);
      } else {
      console.log('Result:', res);
      id = res1.rows[0].gps_id;
      status = 'inactive';
      console.log('GPS ID' , id);
      db.query('INSERT INTO Bus( bus_name, gps_id, bus_status, route_id) VALUES ($1,$2, $3,$4) RETURNING bus_id',[ req.body.name, id, req.body.status, req.body.routeid], (err:any, result1:any) => {
        if(err){
           console.error( err);
            res.send('Error ' + err);
        }else{
          console.log('entre a meter driver',result1);
          var b_id = result1.rows[0].bus_id;
          db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2',[b_id,req.body.driverid], (err:any, result2:any) => {
            {
              res.send(result1);
            }
          });
        }
      });
    }
  });
});


app.put(_busesURL + '/updateBus', (req, res, next) => {

    console.log('edit id:' + req.body.id);
    db.query('UPDATE Bus SET bus_name=$2, bus_status=$3, route_id=$4 WHERE bus_id=$1 RETURNING bus_id', [ req.body.id,req.body.name, req.body.status, req.body.routeid], (err:any, result:any) => {
      if (err) {
           console.error( err);
            res.send('Error ' + err);
      }else{
        db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2',[null, req.body.olddriverid], (err:any, result1:any) => {
          if (err) {
           console.error( err);
            res.send('Error ' + err);
          }else{
            var b_id = result.rows[0].bus_id;
            db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2',[b_id,req.body.driverid], (err:any, result:any) => {
              {
                res.send(result);
              }
            });
          }
        });
      }
    });
  });


app.delete(_busesURL + '/deleteBus', (req, res, next) => {

  console.log('id:' + req.query.id)
  db.query('UPDATE driver SET bus_id=Null WHERE bus_id=$1',[req.query.id], (err:any, result:any) => {
    if (err) {
           console.error( err);
            res.send('Error ' + err);
    }else{
      db.query('DELETE FROM Bus WHERE bus_id=$1 RETURNING gps_id',[req.query.id], (err:any, result1:any) => {
        if (err) {
           console.error( err);
            res.send('Error ' + err);
        }else{
          db.query('DELETE FROM gps WHERE gps_id=$1',[result1.rows[0].gps_id], (err:any, result2:any) => {
            if (err) {
           console.error( err);
            res.send('Error ' + err);;
            }
            res.send(result2);
          });
        }
      });
    }
  });
});

}
