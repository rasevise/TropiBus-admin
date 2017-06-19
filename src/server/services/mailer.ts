import * as nodemailer from 'nodemailer';
import * as express from 'express';
import * as db from '../db/pg'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'tropibus.mail@gmail.com',
        pass: 'carmela123'
    }
});
var setPassword = 'UPDATE administrator SET admin_password=$1, admin_pass=$2 WHERE admin_email=$3';

export function mailer(app: express.Application) {
    
function makepass(){
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.put('/sendmail', (req, res, next) => {
    let temp_pass = makepass();
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"TropiBus Admin" <tropibus.mail@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'DO NOT REPLY: Password Reset', // Subject line
        html: '<p>Dear Admin,</p><p>Your request to reset your password has been received.<br />Your temporary password is: <strong>' + temp_pass + '</strong></p><p>Please log in to the application to reset your password.</p><p>Thanks,</p><p>TropiBus Administration</p>' // html body
    };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                db.query(setPassword,[temp_pass, true, req.body.email] ,(err:any, result:any) => {
                    if (err){ 
                        console.error(err); 
                        res.send(err);
                    }else {
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.json(result);
                }
            });
    });
});

}