var express = require('express');
var router = express.Router();
var db = require('../server.js');
var checkCredentials= "SELECT admin_id FROM administrator WHERE admin_username=$1 and admin_password=$2"

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var token = jwt.sign({ token: 'tropitoken'}, 'tropi');


//Method to validate Login info with db
router.post('/authenticate', function (req, res) {
  db.query(checkCredentials,[req.body.username, req.body.password] ,function(err, result) {
    if (err){ 
        console.error(err); res.send("Error" + err); 
    }
    else{
        if(result.rows.length==0){
            res.json({admin:-1});
        }
        else{
          admin = result.rows[0];
          res.json({admin, token});
        }
    }
    
    });

});

module.exports = router;