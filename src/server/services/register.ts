import * as express from 'express';
import * as db from '../db/pg';

<<<<<<< HEAD
var createAdmin = 'INSERT INTO administrator(admin_first_name, admin_last_name, admin_username, admin_password,admin_email) VALUES ($1,$2,$3,CRYPT($4,GEN_SALT(\'bf\')),$5)';
=======
var createAdmin = 'INSERT INTO administrator(admin_first_name, admin_last_name, admin_username, admin_password, admin_email) VALUES ($1,$2,$3,CRYPT($4,GEN_SALT(\'bf\')),$5)';
>>>>>>> 17e06bed1baa75405dfc7c795c92351c377463c8
var getAdmin= 'SELECT admin_id, admin_email, admin_status, admin_pass, admin_first_name, admin_last_name, admin_username FROM administrator WHERE admin_id=$1';
var getAdmins= 'SELECT admin_id, admin_email, admin_status, admin_pass, admin_first_name, admin_last_name, admin_username FROM administrator';
var getAdminFromUser= 'SELECT admin_status, admin_pass FROM administrator WHERE admin_username=$1';
var updateAdmin = 'UPDATE administrator SET admin_first_name=$1, admin_last_name=$2, admin_email=$4 WHERE admin_id=$3';
var setPassword = 'UPDATE administrator SET admin_password=CRYPT($1,GEN_SALT(\'bf\')), admin_pass=$2 WHERE admin_id=$3';
var updatePassword = 'UPDATE administrator SET admin_password=CRYPT($1,GEN_SALT(\'bf\')), admin_pass=$2 WHERE admin_id=$3';
var getPass = 'SELECT admin_id FROM administrator WHERE admin_id=$1 AND admin_password=CRYPT($2,GEN_SALT(\'bf\'))';

export function register(app: express.Application) {
var admin;

app.get('/register/getAdmin', (req, res, next) => {
    res.contentType('application/json');
    db.query(getAdmin, [req.query.id], (err:any, result:any) => {
        if (err) {
            console.error("Error: " + err);
            res.send(err);
        }else {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        }
    });
});

app.get('/register/getAdminFromUser', (req, res, next) => {
    res.contentType('application/json');
    db.query(getAdminFromUser, [req.query.user], (err:any, result:any) => {
        if (err) {
            console.error("Error: " + err);
            res.send(err);
        }else {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        }
    });
});

app.get('/register/getAdmins', (req, res, next) => {
    res.contentType('application/json');
    db.query(getAdmins, null, (err:any, result:any) => {
        if (err) {
            console.error("Error: " + err);
            res.send(err);
        }else {
            res.json(result.rows);
        }
    });
});

//Method to validate Login info with db
app.post(`/register`, (req:any, res:any) => {
  db.query(createAdmin,[req.body.name, req.body.last, req.body.username, req.body.password, req.body.email] ,(err:any, result:any) => {
    if (err) {
        console.error("Error: " + err.code);
        res.send(err.code);
    }else {
        res.json(result);
    }
    });
});

app.put(`/register/update`, (req:any, res:any) => {
    db.query(updateAdmin,[req.body.name, req.body.last, req.body.id, req.body.email] ,(err:any, result:any) => {
        if (err){ 
            console.error("Error: " + err);
            res.send(err.code);
        }else {
            res.json(result.rows);
        }
    });
});

app.put(`/register/setPassword`, (req:any, res:any) => {
    db.query(setPassword,[req.body.password, false, req.body.id] ,(err:any, result:any) => {
        if (err){ 
            console.error("Error: " + err);
            res.send(err.code);
        }else {
            res.json(result);
        }
    });
});

app.put(`/register/updatePassword`, (req:any, res:any) => {

    db.query(getPass,[req.body.id, req.body.oldpassword] ,(err:any, result:any) => {
        if (err){ 
            console.error("Error: " + err); 
            res.send(err.code);
        }else {
            if(result.rows.length !== 0){
            db.query(updatePassword,[req.body.password, false, req.body.id] ,(err:any, result1:any) => {
                if (err){ 
                    console.error("Error: " + err); 
                    res.send(err.code);
                }else {
                    res.json({"response":true})
                }
            });}
            else{
                res.json({"response":false})
            }
        }
    });

});

}
