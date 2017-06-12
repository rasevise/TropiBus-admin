import * as express from 'express';
import * as db from '../db/pg';
import * as jwt from 'jsonwebtoken';

var checkCredentials= 'SELECT admin_id FROM administrator WHERE admin_username=$1 and admin_password=$2';

export function login(app: express.Application) {
// sign with default (HMAC SHA256)
var token = jwt.sign({ token: 'tropitoken'}, 'tropi');
var admin;
//Method to validate Login info with db
app.post(`/login/authenticate`, (req:any, res:any) => {
  db.query(checkCredentials,[req.body.username, req.body.password] ,function(err:any, result:any) {
    if (err) {
        console.error(err);
        res.send('Error' + err);
    }else {
        if(result.rows.length===0) {
            res.status(400).send({
              message: 'Incorrect Credentials'
            });
        }else {
            admin = result.rows[0];
            res.json(admin, token);
        }
    }
    });

});
}
