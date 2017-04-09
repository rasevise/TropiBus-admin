var express = require('express');
var router = express.Router();
const db = require('../server.js');

var Message = [];



router.get('/', function(req, res, next){
  console.log("getting messages from server: " );
  res.contentType('application/json');
  db.query('SELECT * FROM Message', sendData);

  function sendData(err, results) {
    console.log("getting messages from server: " + results.rows[0].message_title);
    Message = results.rows;
    res.json(Message);
  }

});


router.post('/addMessage', function (req, res, next) {

  var m_title = req.body.title;
  var m_mess = req.body.messageContent;
  console.log("message: " + m_mess );

  var newD = {
    id: '',
    title: m_title,
    messageContent: m_mess
  };

  Message.push(newD);

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