var express = require('express');
var router = express.Router();
const db = require('../server.js');

var Message = [];



router.get('/', function(req, res, next){
  console.log("getting messages from server: " );
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

router.delete('/deleteMessage', function (req, res, next) {
  var index = req.query.index;
  console.log("inside delete with index: " + index);
  Message.splice(index, 1);
});

module.exports = router;