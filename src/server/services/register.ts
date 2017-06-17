import * as express from 'express';
import * as db from '../db/pg';

var createAdmin = 'INSERT INTO administrator(admin_first_name, admin_last_name, admin_username, admin_password) VALUES ($1,$2,$3,$4)';
var getAdmin= 'SELECT * FROM administrator WHERE admin_id=$1';
var updateAdmin = 'UPDATE administrator SET admin_first_name=$1, admin_last_name=$2, admin_password=$3 WHERE admin_id=$4';
var setPassword = 'UPDATE administrator SET admin_password=$1, admin_pass=$2 WHERE admin_id=$3';
var updatePassword = 'UPDATE administrator SET admin_password=$1, admin_pass=$2 WHERE admin_id=$3 AND admin_password=$4';

export function register(app: express.Application) {
var admin;

app.get('/register/getAdmin', (req, res, next) => {
    res.contentType('application/json');
    db.query(getAdmin, [req.query.id], (err:any, result:any) => {
        if (err) {
            console.error(err);
            result.send('Error ' + err);
        }else {
            res.json(result.rows[0]);
        }
    });
});

//Method to validate Login info with db
app.post(`/register`, (req:any, res:any) => {
  db.query(createAdmin,[req.body.name, req.body.last, req.body.username, req.body.password] ,(err:any, result:any) => {
    if (err) {
        console.error(err.code);
        res.send(err.code);
    }else {
        res.json(result);
    }
    });
});

app.put(`/register/update`, (req:any, res:any) => {
    db.query(updateAdmin,[req.body.name, req.body.last, req.body.password, req.body.id] ,(err:any, result:any) => {
        if (err){ 
            console.error(err); res.send(err); 
            res.send(err.code);
        }else {
            res.json(result.rows);
        }
    });
});

app.put(`/register/setPassword`, (req:any, res:any) => {
    db.query(setPassword,[req.body.password, false, req.body.id] ,(err:any, result:any) => {
        if (err){ 
            console.error(err); res.send(err); 
            res.send(err.code);
        }else {
            res.json(result);
        }
    });
});

app.put(`/register/updatePassword`, (req:any, res:any) => {
    db.query(updatePassword,[req.body.password, false, req.body.id, req.body.oldpassword] ,(err:any, result:any) => {
        if (err){ 
            console.error(err); res.send(err); 
            res.send(err.code);
        }else {
            res.json(result);
        }
    });
});

}
