var express = require('express');
var router = express.Router();
const db = require('../server.js');

var Message = [];



router.get('/', function(req, res, next){
  console.log("getting messages from server: " );
  res.contentType('application/json');
  db.query('SELECT * FROM Message', sendData);

  function sendData(err, results) {
<<<<<<< HEAD
    console.log("getting messages from server: ");
=======
>>>>>>> 64ae4d576ac81a1f45d109839454a21c2bee8efe
    Message = results.rows;
    res.json(Message);
  }

});


router.post('/addMessage', function (req, res, next) {
<<<<<<< HEAD
   var m_title = req.body.title;
  var m_mess = req.body.messageContent;
  var m_date = req.body.date
  var i = parseInt(req.body.id);
  console.log("getting messages from server: " + i + m_date + m_mess + m_title );
  
  res.contentType('application/json');
  db.query('INSERT INTO Message(admin_id, message_text, message_date, message_title) VALUES($1,$2,$3,$4)', [i],[m_mess],[m_date],[m_title]);
console.log("helo")
=======
  var m_title = req.body.title;
  var m_mess = req.body.messageContent;
  // db.query('INSERT INTO Message(admin_id, message_text, message_date, message_title) VALUES(${i},${m_mess},${m_date},${m_title})', sendData);
  function sendData(err, results) {
    res.send(200);
  }
  db.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.send(200)
    })

>>>>>>> 64ae4d576ac81a1f45d109839454a21c2bee8efe
});

router.put('/updateMessage', function (req, res, next) {
  var m_title = req.body.title;
  var m_mess = req.body.messageContent;
  var i = req.body.index;
  var newD = ({
    id: Message.length,
    title: m_title,
    messageContent: m_mess
  });
  Message[i] = newD;
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



module.exports = router;