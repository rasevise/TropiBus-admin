var express = require('express');
var router = express.Router();
var app = express();
var Message =[
    { id: 1, title: "Expecto Patronus", messageContent: "Due to a number of demeantors entering the facilities a special class on demeantors and the expecto patronus will be held"},
    { id: 2, title: "Vampire Seminar", messageContent: "A special vampire seminar will be held by a Professor delToro who specializes in the study of vampirism" },
    { id: 3, title: "No class", messageContent: "Tomorrow there will be no class due to a meeting with the ministry of magic which will be held in the theather B" },
    ]


router.get('/', function(req, res, next){
  console.log("getting messages from server: " );
  res.contentType('application/json');
  res.json(Message);
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