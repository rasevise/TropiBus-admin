/** 
 * Author: Luis Toro
 * Creation Date: 3/23/2017
 *
 * Description: Contains Bus Tracking app routes and queries 
 * 
 * Routes:
 * /updateRoute send bus id and route id
 * /login send username password, return driver id if successful, return -1 if unsuccessful
 * /logout 
 * /getDriver info with route and bus will get bus name, bus id, driver name, driver lastname, driver id, route id, route name
 * /update status param bus id, bus status
 * getRoute send back all route ids and route names
**/


import * as express from 'express';
import * as db from '../db/pg';

// Queries var Declaration.

//Routes for get
var getDriverInfo = 'SELECT driver_id, driver_firstname, driver_lastname, bus_id, bus_name,bus_status, route_id, route_name FROM bus NATURAL JOIN driver NATURAL JOIN route WHERE driver_id = $1' 
var getRoutes = 'SELECT route_name,route_id FROM route' //SELECT route_id,route_name FROM route
var getDriverBusID = 'SELECT bus_id FROM driver WHERE driver_id = $1'
var getGPSid = 'SELECT gps_id FROM bus WHERE bus_id = $1'

var getDriverBusGPSid = 'SELECT gps_id FROM bus NATURAL JOIN driver WHERE driver_id = $1' 


//Routes for update

var changeDriverRoute = 'UPDATE bus SET route_id = $1 where bus_id=$2'
var updateDriverBus = 'UPDATE driver SET bus_id= $1 WHERE driver_id = $2'
var updateBusStatus = 'UPDATE bus SET bus_status = $1 WHERE bus_id = $2'
var updateBusLocation = 'UPDATE GPS SET gps_latitude = $1, gps_longitude = $2 WHERE gps_id = $3'

//Routes for login/logout 
var checkCredentials= "SELECT driver_id FROM driver WHERE driver_username=$1 and driver_password=$2"
var login = 'UPDATE driver SET driver_status = \'logged\' WHERE driver_id = $1'
var logout = 'UPDATE driver SET driver_status = \'not logged\' WHERE driver_id = $1'

var _trackURL = '/bustrackingRoutes'

export function bustrack(app: express.Application) {

//get information from driver from database and send back to application
app.get(_trackURL + '/getDriverInfo', (req:any, res:any, next:any) => { // Parameter: Route ID
    console.log(" getting driver info",req.body)
    db.query(getDriverInfo, [req.query.driver_id], (err:any, result:any) => {

        if (err)
            { console.error(err); res.send("Error " + err); }
        else{
        res.json(result.rows[0]);
        console.log(result.rows[0])
        }
    });
});

//get routes names and ids from database and send back to application
app.get(_trackURL + '/getRoutes', (req:any, res:any, next:any) => { // Parameter: Route ID
    console.log("getting tim's routes ")
        db.query(getRoutes, null, (err:any, result:any) => {

            if (err){
                console.error(err); res.send("Error " + err); }
            else{
                res.json(result.rows);
                console.log(result.rows);
            }
        });
});


//change driver route, updating on database and sending back driver info to application
app.put(_trackURL + '/changeDriverRoute', (req:any, res:any, next:any) => {
    console.log("entre a cambiar ruta de conductor",req.body)
        db.query(changeDriverRoute,[req.body.route_id,req.body.bus_id] ,(err:any, result:any) => {

            if (err)
             {
                 console.error(err); res.send("Error" + err);
             }
            
            else{
                db.query(getDriverInfo,[req.body.driver_id] ,(err:any, result:any) => {

                if (err)
                { 
                    console.error(err); res.send("Error" + err);
                }
                else
                res.json(result.rows[0]);
            });
            }
        });
});

//updating bus status on database and then sending back driver info to application
app.put(_trackURL + '/updateBusStatus', (req:any, res:any, next:any) => {
    console.log("haciendo update al status del bus", req.body)
        db.query(updateBusStatus,[req.body.bus_status,req.body.bus_id] ,(err:any, result:any) => {

            if (err)
             { 
                 console.error(err); res.send("Error" + err); 
            }
            else{
                db.query(getDriverInfo,[req.body.driver_id] ,(err:any, result:any) => {

                if (err)
                { 
                    console.error(err); res.send("Error" + err);
                }
                else{
                res.json(result.rows[0]);
                
                }
            });
            
            }
        });
});


/*
updateBusLocation server route use run two querties:
    getDriverBusGPSid 
        Parameter: driver_id
        Get: GPS ID of the corresponding driver bus

    updateBusLocation
        Parameter: gps_latitude, gps_longitude, gps_id
        Update: Actual location of the bus  usign gps_latitude and gps_longitude parameters 
*/
app.put(_trackURL + '/updateBusLocation', (req:any, res:any, next:any) => { 
    
    console.log("updating bus location",req.body)
     
        db.query(getDriverBusGPSid,[req.body.driver_id] ,(err:any, result:any) => {
            if (err)
             { console.error(err); res.send("Error" + err); }
            else{
            var gps_id = result.rows[0].gps_id
            
                    db.query(updateBusLocation,[req.body.lat,req.body.lng,gps_id] ,(err:any, result:any) => {

                    if (err)
                    { console.error(err); res.send("Error" + err); }
                    else
                    res.json({success:1})
                    

                    });
            
            }

            //Update the localization of the Driver Bus using the bus GPS ID
           
        });
});



//Routes for login/logout
//login driver on system, updatin driver status to "logged in" if credentials are correct
//if credentials are incorrect send -1 back as a response
app.post(_trackURL + '/login', (req:any, res:any, next:any) => {
    console.log("entre al login",req.body)
    
        db.query(checkCredentials,[req.body.username, req.body.password] ,(err:any, result:any) => {

            if (err){ 
                console.error(err); res.send("Error" + err); 
            }else {
                if(result.rows.length==0){
                 res.json({driver_id:-1});
                }else {
                var driverid=result.rows[0];    
                db.query(login,[driverid.driver_id] ,(err:any, result:any) => {
                    if (err){ 
                        console.error(err); res.send("Error" + err); 
                    }else {
                        console.log("driverid",driverid)
                        res.json(driverid);
                    }
                });
                
             }
            }
            
        });
});

//loging out driver, updting driver status on database
app.put(_trackURL + '/logout', (req:any, res:any, next:any) => {
    console.log("login out",req.body)
        db.query(logout,[req.body.driver_id] ,(err:any, result:any) => {

            if (err)
             { console.error(err); res.send("Error" + err); }
            else{
            res.json({"success":1});
            
            
            }
        });
});

}
