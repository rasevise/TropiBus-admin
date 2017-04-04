var express = require('express');
var router = express.Router();
var app = express();
    Message =[
    { id: 1, title: "Expecto Patronus", messageContent: "Due to a number of demeantors entering the facilities a special class on demeantors and the expecto patronus will be held"},
    { id: 2, title: "Vampire Seminar", messageContent: "A special vampire seminar will be held by a Professor delToro who specializes in the study of vampirism" },
    { id: 3, title: "No class", messageContent: "Tomorrow there will be no class due to a meeting with the ministry of magic which will be held in the theather B" }
    ]


router.get('/', function(req, res, next){
    res.contentType('application/json');
    var routesJSON = JSON.stringify(this.Message);
    res.json(this.Message);
});

<<<<<<< HEAD

router.post('/addM', function (req, res, next) {
=======
// router.post('/', function(req, res){
//     res.contentType('application/json');
//     var title = req.body.title;
//     var id = req.body.id;
//     var messageContent = req.body.messageContent;
//     var date = req.body.date;

//     var routesJSON = JSON.stringify(this.Message);
//     res.json(this.Message);
// }
    
router.post('/addMessage', function (req, res, next) {
    console.log("Hello from messages");
>>>>>>> c070c4a5278dca4329e939477f3c0ced7b845d49
  var m_title = req.body.title;
  var m_mess = req.body.messageContent;

  var newD = ({
    id: Message.length,
    title: m_title,
    messageContent: m_mess
  });
<<<<<<< HEAD
  Driver.push(newD);

=======
  Message.push(newD);
>>>>>>> c070c4a5278dca4329e939477f3c0ced7b845d49
});

module.exports = router;