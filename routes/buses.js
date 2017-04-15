var express = require('express');
var router = express.Router();
const db = require('../server.js');
  var buses = [];



router.get('/', function(req, res, next){
    console.log("getting buses from server: " );
    res.contentType('application/json');
    db.query('SELECT * FROM Bus', sendData);

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
    var id = 0
    var status
    var b_id = Math.floor(Math.random() * (100000 - 1000)) + 1000;
         
         db.query('INSERT INTO GPS(gps_latitude, gps_longitude) VALUES(0,0) RETURNING gps_id', function(err, result) {

            id = result.rows[0].gps_id
            status = 'inactive'

             console.log("GPS ID" , id)

            if (err)
             { console.error(err); response.send("Error " + err); }
            else{
                db.query('INSERT INTO Bus(bus_id, bus_name, gps_id, bus_status) VALUES ($1,$2, $3,$4)',[b_id, req.body.name, id, status] ,function(err, result){

                     if(err)
                { console.error(err); response.send("Error " + err); }
                
                {
                    res.send(result);
                  
                 }
            });
           
            }

        });
    });


router.put('/updateBus', function(req, res, next) {

    console.log("edit id:" + req.body.id);
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    db.query('UPDATE Bus SET bus_name=$1  WHERE bus_id=$2', [req.body.name, req.body.id], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
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
    db.query('DELETE FROM Bus WHERE bus_id=$1 RETURNING gps_id',[req.query.id], function(err, result) {

      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });

// router.delete('/deleteBus', function (req, res, next) {
//   var index = req.query.index;
//   this.buses.splice(index, 1);
// });

module.exports = router;