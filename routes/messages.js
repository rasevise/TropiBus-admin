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

module.exports = router;