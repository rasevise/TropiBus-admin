"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var db = require("../db/pg");
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'tropibus.mail@gmail.com',
        pass: 'carmela123'
    }
});
var setPassword = 'UPDATE administrator SET admin_password=CRYPT($1,GEN_SALT(\'bf\')), admin_pass=$2 WHERE admin_email=$3';
function mailer(app) {
    function makepass() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 7; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    app.put('/sendmail', function (req, res, next) {
        var temp_pass = makepass();
        var mailOptions = {
            from: '"TropiBus Admin" <tropibus.mail@gmail.com>',
            to: req.body.email,
            subject: 'DO NOT REPLY: Password Reset',
            html: '<p>Dear Admin,</p><p>Your request to reset your password has been received.<br />Your temporary password is: <strong>' + temp_pass + '</strong></p><p>Please log in to the application to reset your password.</p><p>Thanks,</p><p>TropiBus Administration</p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            db.query(setPassword, [temp_pass, true, req.body.email], function (err, result) {
                if (err) {
                    console.error(err);
                    res.send(err);
                }
                else {
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.json(result);
                }
            });
        });
    });
}
exports.mailer = mailer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL21haWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUV6Qyw2QkFBOEI7QUFHOUIsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUN6QyxPQUFPLEVBQUUsT0FBTztJQUNoQixJQUFJLEVBQUUsR0FBRztJQUNULE1BQU0sRUFBRSxJQUFJO0lBQ1osSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixJQUFJLEVBQUUsWUFBWTtLQUNyQjtDQUNKLENBQUMsQ0FBQztBQUNILElBQUksV0FBVyxHQUFHLHdHQUF3RyxDQUFDO0FBRTNILGdCQUF1QixHQUF3QjtJQUUvQztRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1FBRWhGLEdBQUcsQ0FBQSxDQUFFLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV6RSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNoQyxJQUFJLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUUzQixJQUFJLFdBQVcsR0FBRztZQUNkLElBQUksRUFBRSw0Q0FBNEM7WUFDbEQsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNsQixPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLElBQUksRUFBRSx1SEFBdUgsR0FBRyxTQUFTLEdBQUcsMEhBQTBIO1NBQ3pRLENBQUM7UUFFTSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQUMsR0FBTyxFQUFFLE1BQVU7Z0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFBQSxJQUFJLENBQUMsQ0FBQztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsQ0FBQztBQXRDRCx3QkFzQ0MiLCJmaWxlIjoic2VydmljZXMvbWFpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYi9wZydcblxuLy8gY3JlYXRlIHJldXNhYmxlIHRyYW5zcG9ydGVyIG9iamVjdCB1c2luZyB0aGUgZGVmYXVsdCBTTVRQIHRyYW5zcG9ydFxubGV0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgIHNlcnZpY2U6ICdHbWFpbCcsXG4gICAgcG9ydDogNDY1LFxuICAgIHNlY3VyZTogdHJ1ZSwgLy8gc2VjdXJlOnRydWUgZm9yIHBvcnQgNDY1LCBzZWN1cmU6ZmFsc2UgZm9yIHBvcnQgNTg3XG4gICAgYXV0aDoge1xuICAgICAgICB1c2VyOiAndHJvcGlidXMubWFpbEBnbWFpbC5jb20nLFxuICAgICAgICBwYXNzOiAnY2FybWVsYTEyMydcbiAgICB9XG59KTtcbnZhciBzZXRQYXNzd29yZCA9ICdVUERBVEUgYWRtaW5pc3RyYXRvciBTRVQgYWRtaW5fcGFzc3dvcmQ9Q1JZUFQoJDEsR0VOX1NBTFQoXFwnYmZcXCcpKSwgYWRtaW5fcGFzcz0kMiBXSEVSRSBhZG1pbl9lbWFpbD0kMyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWlsZXIoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XG4gICAgXG5mdW5jdGlvbiBtYWtlcGFzcygpe1xuICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgdmFyIHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcblxuICAgIGZvciggdmFyIGk9MDsgaSA8IDc7IGkrKyApXG4gICAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuXG4gICAgcmV0dXJuIHRleHQ7XG59XG5cbmFwcC5wdXQoJy9zZW5kbWFpbCcsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGxldCB0ZW1wX3Bhc3MgPSBtYWtlcGFzcygpO1xuICAgIC8vIHNldHVwIGVtYWlsIGRhdGEgd2l0aCB1bmljb2RlIHN5bWJvbHNcbiAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgIGZyb206ICdcIlRyb3BpQnVzIEFkbWluXCIgPHRyb3BpYnVzLm1haWxAZ21haWwuY29tPicsIC8vIHNlbmRlciBhZGRyZXNzXG4gICAgICAgIHRvOiByZXEuYm9keS5lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcbiAgICAgICAgc3ViamVjdDogJ0RPIE5PVCBSRVBMWTogUGFzc3dvcmQgUmVzZXQnLCAvLyBTdWJqZWN0IGxpbmVcbiAgICAgICAgaHRtbDogJzxwPkRlYXIgQWRtaW4sPC9wPjxwPllvdXIgcmVxdWVzdCB0byByZXNldCB5b3VyIHBhc3N3b3JkIGhhcyBiZWVuIHJlY2VpdmVkLjxiciAvPllvdXIgdGVtcG9yYXJ5IHBhc3N3b3JkIGlzOiA8c3Ryb25nPicgKyB0ZW1wX3Bhc3MgKyAnPC9zdHJvbmc+PC9wPjxwPlBsZWFzZSBsb2cgaW4gdG8gdGhlIGFwcGxpY2F0aW9uIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQuPC9wPjxwPlRoYW5rcyw8L3A+PHA+VHJvcGlCdXMgQWRtaW5pc3RyYXRpb248L3A+JyAvLyBodG1sIGJvZHlcbiAgICB9O1xuICAgICAgICAgICAgLy8gc2VuZCBtYWlsIHdpdGggZGVmaW5lZCB0cmFuc3BvcnQgb2JqZWN0XG4gICAgICAgICAgICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgKGVycm9yLCBpbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRiLnF1ZXJ5KHNldFBhc3N3b3JkLFt0ZW1wX3Bhc3MsIHRydWUsIHJlcS5ib2R5LmVtYWlsXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycil7IFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01lc3NhZ2UgJXMgc2VudDogJXMnLCBpbmZvLm1lc3NhZ2VJZCwgaW5mby5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxufSJdfQ==
