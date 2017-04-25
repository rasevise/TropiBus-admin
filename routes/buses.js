var express = require('express');
var router = express.Router();
const db = require('../server.js');
  var buses = [];



router.get('/', function(req, res, next){
    console.log("getting buses from server: " );
    res.contentType('application/json');
    db.query('SELECT * FROM Bus NATURAL JOIN Driver', sendData);

  function sendData(err, results) {
    console.log("getting buses from server: ");
    buses = results.rows;
    res.json(buses);
  }
});



// router.post('/addBus', function (req, res, next) {
//   var b_name = req.body.name;
//   var b_driver = req.body.driver;
//   var b_route = req.body.route;
//   var b_status = req.body.status;

//   var newB = ({
//     id: buses.length,
//     name: b_name,
//     driver: b_driver,
//     route: b_route,
//     status: b_status
//   });
//   buses.push(newB);
// });


router.post('/addBus', function(req, res, next) {
    console.log('Create a bus')
    //console.log(req.query.)
    var id = 0;
    var status;
         
         db.query('INSERT INTO GPS(gps_latitude, gps_longitude) VALUES(0,0) RETURNING gps_id', function(err, result) {
            console.log("Result:", result)
            id = result.rows[0].gps_id
            status = 'inactive'

             console.log("GPS ID" , id)

            if (err)
             { console.error(err); response.send("Error " + err); }
            else{
                db.query('INSERT INTO Bus( bus_name, gps_id, bus_status, route_id) VALUES ($1,$2, $3,$4) RETURNING bus_id',[ req.body.name, id, req.body.status, req.body.routeid] ,function(err, result1){

                     if(err)
                { console.error(err); response.send("Error " + err); }
                else{
                  console.log("entre a meter driver",result1)
                      var b_id = result1.rows[0].bus_id
                  db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2',[b_id,req.body.driverid] ,function(err, result) {
                {
                    res.send(result1);
                  
                 }
                  });
              }

            });//dbquery
           
            }

        });//dbquery
    });


router.put('/updateBus', function(req, res, next) {

    console.log("edit id:" + req.body.id);
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    db.query('UPDATE Bus SET bus_name=$2, bus_status=$3, route_id=$4 WHERE bus_id=$1 RETURNING bus_id', [ req.body.id,req.body.name, req.body.status, req.body.routeid], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      else{
        b_id = result.rows[0].bus_id
        db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2',[b_id,req.body.driverid] ,function(err, result) {
      {
      res.send(result);
    }
        });
        }
    });
  });


// router.put('/updateBus', function (req, res, next) {
//   var b_name = req.body.name;
//   var b_driver = req.body.driver;
//   var b_route = req.body.route;
//   var b_status = req.body.status;
//   var i = req.body.index;

// var newB = ({
//     id: buses.length,
//     name: b_name,
//     driver: b_driver,
//     route: b_route,
//     status: b_status
//   });
//   buses[i] = newB;
// });

router.delete('/deleteBus', function(req, res, next) {

  console.log("id:" + req.query.id)
  db.query('UPDATE driver SET bus_id=Null WHERE bus_id=$1',[req.query.id], function(err, result) {
    
      if (err) {
        return console.error('error running query', err);
      }
      else{
        db.query('DELETE FROM Bus WHERE bus_id=$1 RETURNING gps_id',[req.query.id], function(err, result1) {
            if (err) {
              return console.error('error running query', err);
            }
            else{                
                  db.query('DELETE FROM gps WHERE gps_id=$1',[result1.rows[0].gps_id], function(err, result2) {
                    if (err) {
                      return console.error('error running query', err);
                    }
                    res.send(result2);
                  });
      }
          });
      }
      
    });
  });

// router.delete('/deleteBus', function (req, res, next) {
//   var index = req.query.index;
//   this.buses.splice(index, 1);
// });

module.exports = router;