import * as express from 'express';
import * as db from '../db/pg';
import * as jwt from 'jsonwebtoken';

var checkCredentials= 'SELECT admin_id FROM administrator WHERE admin_username=$1 and admin_password=CRYPT($2,admin_password)';
var setStatus = 'UPDATE administrator SET admin_status=$1 WHERE admin_id=$2';

export function login(app: express.Application) {
// sign with default (HMAC SHA256)
var token = jwt.sign({ token: 'tropitoken'}, 'tropi');
var admin;
//Method to validate Login info with db
app.post(`/login/authenticate`, (req:any, res:any) => {
  db.query(checkCredentials,[req.body.username, req.body.password] ,(err:any, result:any) => {
    if (err) {
        console.error(err);
        res.send('Error' + err);
    }else {
        if(result.rows.length===0) {
            res.json({
              message: 'Incorrect Credentials'
            });
        }else {
            admin = result.rows[0].admin_id;
            console.log(admin);
            db.query(setStatus,[true, admin] ,(err:any, result:any) => {
                if (err) {
                    console.error(err);
                    res.send('Error' + err);
                }
            });
            res.json({admin, token});
        }
    }
    });

});

app.put(`/login/logout`, (req:any, res:any) => {
  db.query(setStatus,[false, req.body.id] ,(err:any, result:any) => {
    if (err) {
        console.error(err);
        res.send('Error' + err);
    }else {
        res.json({'result': "logout"});
    }
    });
});

}
