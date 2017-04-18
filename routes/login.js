var express = require('express');
var router = express.Router();
var db = require('../server.js');
var checkCredentials= "SELECT admin_id FROM administrator WHERE admin_username=$1 and admin_password=$2"

//Method to render page login or if a session is open redirect to profile
router.get('/', function (req, res) {
  if (!req.session.user) {
    res.render('login.html', {
      sitename: 'TropiBus Admin Login'
    });
  } else {
    res.redirect('/')
  }
});

//Method to validate Login info with db
router.post('/', function (req, res) {
  client.query(checkCredentials,[req.query.admin_username, req.query.admin_password] ,function(err, result) {
    if (err){ 
        console.error(err); res.send("Error" + err); 
    }
    else{
        if(result.rows.length==0){
            res.json({admin:-1});
        }
        else{
            var admin=result.rows[0]
            req.session.user = {
            username: admin.admin_username,
            id: admin.admin_id,
            };               
            return res.redirect('/');
        }
    }
    
    });

});


//method to logout and end session
router.post('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;