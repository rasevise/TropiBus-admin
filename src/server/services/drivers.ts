import * as express from 'express';
import * as db from '../db/pg';

export function drivers(app: express.Application) {

let _driversURL = '/drivers';

app.get(_driversURL, (req, res, next) => {
  console.log('getting messages from server: ');
  res.contentType('application/json');
  db.query('SELECT * FROM Driver ORDER BY driver_status', null, (err:any, results:any) => {
    if(err) {
      res.send(err);
    }
    res.json(results.rows);
  });
});

app.post(_driversURL + '/addDriver', (req, res, next) => {
  var status = 'not logged';
  console.log('password:' + req.body.password);
  db.query('INSERT INTO driver( driver_firstname, driver_lastname, driver_username, driver_password, driver_status) VALUES ($1,$2,$3,$4,$5)', [req.body.name,req.body.lastName,req.body.username,req.body.password, status], (err:any, result:any) => {
    if(err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put(_driversURL + '/updateDriver', (req, res, next) => {
  db.query('UPDATE driver SET driver_firstname = $2, driver_lastname = $3,  driver_username = $4, driver_password = $5 WHERE driver_id = $1', [req.body.id, req.body.name, req.body.lastName, req.body.username, req.body.password], (err:any, result:any) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.send(result);
  });
});


app.delete(_driversURL + '/deleteDriver', (req, res, next) => {
  db.query('DELETE FROM driver WHERE driver_id = $1',[req.query.id], (err:any, result:any) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.send(result);
  });
});

}
