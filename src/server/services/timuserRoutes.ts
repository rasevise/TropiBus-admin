/** 
 * Author: Luis Toro
 * Creation Date: 3/18/2017
 *
 * Description: Contains Bus Tracking app routes and queries 
 * 
 * Routes:
 * 	/getAllRoutes
 *  /getRoute 
 *  /getAllStops 
 *  /getNearestStop 
 *  /getStopsFromRoute 
 *  /getBusLocation 
 *  /getMessages 
 *  /getBuses 
**/

import * as express from 'express';
import * as db from '../db/pg';

export function userApp(app: express.Application) {

//Routes queries declaration 


const _userURL = '/timuserRoutes';
var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop WHERE route_id=$1 ORDER BY stop_order' 
var getBusLocation = 'SELECT gps_latitude, gps_longitude, bus_name,bus_status FROM bus NATURAL JOIN gps WHERE route_id=$1'
var getMessages = 'SELECT * FROM message'
var getAllRoutes = 'SELECT * FROM route NATURAL JOIN routepath ORDER BY route_area'
var getRouteStatus='SELECT route_id, bus_status from route NATURAL JOIN bus WHERE bus_status<>\'Inactive\''

//get all routes from database and send them back as response
app.get('/getAllRoutes', (req:any, res:any, next:any) => {
    console.log("entre a cojer todas las rutas");
        //run query
        db.query(getAllRoutes, null, (err:any, result:any) => {

            if (err)
             { console.error(err); res.send("Error " + err); }
            else{
                //run query
            db.query(getRouteStatus, null, (err:any, result1:any) => {

                if (err)
                { console.error(err); res.send("Error " + err); }
                else{
                console.log("coji el status de las rutas")
                var results=result.rows;
                var tempResults=result1.rows;
                console.log("routes status result",tempResults)
                //if no buses are active set status of routes to inactive
                if(tempResults.length==0){
                    for(var i=0;i<results.length;i++){
                        results[i].status="Inactive"
                    }
                }
                //some buses are active on some route
                else{
                    for(var i=0;i<results.length;i++){
                        var active=false;
                        //if bus has an active or changing driver status, set route status to active
                        for(var j=0;j<tempResults.length;j++){
                            if(results[i].route_id==tempResults[j].route_id){
                                results[i].status="Active"
                                active=true; 
                                break;                                                     
                            }
                        }
                        //if there is no bus on some route with active or changing driver status,
                        //assigned route status to inactive
                         if(!active){
                                results[i].status="Inactive"
                            }
                    } 
                
                }
                //sending result back as json
                res.json(results);
                }
                
            });
            }
        });
});


//get all bus stops from specific route and send info back as response
app.get('/getStopsFromRoute', (req:any, res:any, next:any) => {//Parameter: Route ID
    console.log("cojer paradas de ruta especifica",req.query.route_id)
    //conneting to database
        //running query
        db.query(getStopsFromRoute,[req.query.route_id], (err:any, result:any) => {

            if (err)
             { console.error(err); res.send("Error " + err); }
            else{
            //sending response back as  json
            res.json(result.rows);
            }
        });
});

//getting bus location from specific route
app.get('/getBusLocation', (req:any, res:any, next:any) => {
    console.log("buscando localizacion de bus",req.query.route_id)
    //connecting to database
        //runnig query
        db.query(getBusLocation, [req.query.route_id],(err:any, result:any) => {

            if (err)
             { console.error(err); res.send("Error " + err); }
            else{
            //sending result back as json
            res.json(result.rows);
            }
        });
});

//getting messages posted by administrator
app.get('/getMessages', (req:any, res:any, next:any) => {
    console.log("getting messages")
    //connecting to database
        //run query
        db.query(getMessages, null, (err:any, result:any) => {

            if (err)
             { console.error(err); res.send("Error " + err); }
            else{
            //send result back as json
            res.json(result.rows);
            }
        });
});

}

