var express = require('express');
var router = express.Router();
const db = require('../server.js');

var Message = [];



router.get('/', function(req, res, next){
  res.contentType('application/json');
  db.query('SELECT * FROM Message', sendData);

  function sendData(err, results) {

    Message = results.rows;
    res.json(Message);
  }

});


router.post('/addMessage', function (req, res, next) {

  var m_title = req.body.title;
  var m_mess = req.body.messageContent;
  // var m_date = req.body.date;
  var m_id = Math.floor(Math.random() * (100000 - 1000)) + 1000;
  var a_id = 2;
  var dt = new Date();
  var m_date = dt.toUTCString();
  console.log("creating message from server: " + m_mess + ", date: " + m_date);
  db.query('INSERT INTO Message(message_id, message_text, message_date, admin_id, message_title) VALUES($1, $2, $3, $4, $5)', [m_id,m_mess,m_date,a_id,m_title], function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    res.send(result);
  });
  // function sendData(err, results) {
  //   res.sendStatus(200);
  // }
  // db.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
  //     done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

  //     if (err) {
  //       // pass the error to the express error handler
  //       return next(err)
  //     }

  //     res.send(200)
  //   })

});

// router.put('/updateMessage', function (req, res, next) {
//   var m_title = req.body.title;
//   var m_mess = req.body.messageContent;
//   var i = req.body.index;
//   var newD = ({
//     id: Message.length,
//     title: m_title,
//     messageContent: m_mess
//   });
//   Message[i] = newD;
// });

router.put('/updateMessage', function(req, res, next) {

    console.log("edit id:" + req.body.id);
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    db.query('UPDATE Message SET message_title = $2, message_text = $3  WHERE message_id = $1', [req.body.id, req.body.title, req.body.messageContent], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });


// router.delete('/deleteMessage', function (req, res, next) {
//   var index = req.query.index;
//   console.log("inside delete with index: " + index);
//   Message.splice(index, 1);
// });

// router.delete('/deleteMessage', function (req, res, next) {
  

//   res.contentType('application/json');
//    db.query('delete from Message where id = 1')



// });

router.delete('/deleteMessage', function(req, res, next) {
  var deleteID = parseInt(req.params.id)
  console.log("id:" + req.query.id)
    db.query('DELETE FROM Message WHERE message_id = $1',[req.query.id], function(err, result) {

      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });




module.exports = router;