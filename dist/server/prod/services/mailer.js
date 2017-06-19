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
var setPassword = 'UPDATE administrator SET admin_password=$1, admin_pass=$2 WHERE admin_email=$3';
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL21haWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUV6Qyw2QkFBOEI7QUFHOUIsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUN6QyxPQUFPLEVBQUUsT0FBTztJQUNoQixJQUFJLEVBQUUsR0FBRztJQUNULE1BQU0sRUFBRSxJQUFJO0lBQ1osSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixJQUFJLEVBQUUsWUFBWTtLQUNyQjtDQUNKLENBQUMsQ0FBQztBQUNILElBQUksV0FBVyxHQUFHLGdGQUFnRixDQUFDO0FBRW5HLGdCQUF1QixHQUF3QjtJQUUvQztRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1FBRWhGLEdBQUcsQ0FBQSxDQUFFLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV6RSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNoQyxJQUFJLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUUzQixJQUFJLFdBQVcsR0FBRztZQUNkLElBQUksRUFBRSw0Q0FBNEM7WUFDbEQsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNsQixPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLElBQUksRUFBRSx1SEFBdUgsR0FBRyxTQUFTLEdBQUcsMEhBQTBIO1NBQ3pRLENBQUM7UUFFTSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQUMsR0FBTyxFQUFFLE1BQVU7Z0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFBQSxJQUFJLENBQUMsQ0FBQztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsQ0FBQztBQXRDRCx3QkFzQ0MiLCJmaWxlIjoic2VydmljZXMvbWFpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGIvcGcnXHJcblxyXG4vLyBjcmVhdGUgcmV1c2FibGUgdHJhbnNwb3J0ZXIgb2JqZWN0IHVzaW5nIHRoZSBkZWZhdWx0IFNNVFAgdHJhbnNwb3J0XHJcbmxldCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICAgIHNlcnZpY2U6ICdHbWFpbCcsXHJcbiAgICBwb3J0OiA0NjUsXHJcbiAgICBzZWN1cmU6IHRydWUsIC8vIHNlY3VyZTp0cnVlIGZvciBwb3J0IDQ2NSwgc2VjdXJlOmZhbHNlIGZvciBwb3J0IDU4N1xyXG4gICAgYXV0aDoge1xyXG4gICAgICAgIHVzZXI6ICd0cm9waWJ1cy5tYWlsQGdtYWlsLmNvbScsXHJcbiAgICAgICAgcGFzczogJ2Nhcm1lbGExMjMnXHJcbiAgICB9XHJcbn0pO1xyXG52YXIgc2V0UGFzc3dvcmQgPSAnVVBEQVRFIGFkbWluaXN0cmF0b3IgU0VUIGFkbWluX3Bhc3N3b3JkPSQxLCBhZG1pbl9wYXNzPSQyIFdIRVJFIGFkbWluX2VtYWlsPSQzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWlsZXIoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XHJcbiAgICBcclxuZnVuY3Rpb24gbWFrZXBhc3MoKXtcclxuICAgIHZhciB0ZXh0ID0gJyc7XHJcbiAgICB2YXIgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaSA8IDc7IGkrKyApXHJcbiAgICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuXHJcbmFwcC5wdXQoJy9zZW5kbWFpbCcsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgbGV0IHRlbXBfcGFzcyA9IG1ha2VwYXNzKCk7XHJcbiAgICAvLyBzZXR1cCBlbWFpbCBkYXRhIHdpdGggdW5pY29kZSBzeW1ib2xzXHJcbiAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgZnJvbTogJ1wiVHJvcGlCdXMgQWRtaW5cIiA8dHJvcGlidXMubWFpbEBnbWFpbC5jb20+JywgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICB0bzogcmVxLmJvZHkuZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgc3ViamVjdDogJ0RPIE5PVCBSRVBMWTogUGFzc3dvcmQgUmVzZXQnLCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICBodG1sOiAnPHA+RGVhciBBZG1pbiw8L3A+PHA+WW91ciByZXF1ZXN0IHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQgaGFzIGJlZW4gcmVjZWl2ZWQuPGJyIC8+WW91ciB0ZW1wb3JhcnkgcGFzc3dvcmQgaXM6IDxzdHJvbmc+JyArIHRlbXBfcGFzcyArICc8L3N0cm9uZz48L3A+PHA+UGxlYXNlIGxvZyBpbiB0byB0aGUgYXBwbGljYXRpb24gdG8gcmVzZXQgeW91ciBwYXNzd29yZC48L3A+PHA+VGhhbmtzLDwvcD48cD5Ucm9waUJ1cyBBZG1pbmlzdHJhdGlvbjwvcD4nIC8vIGh0bWwgYm9keVxyXG4gICAgfTtcclxuICAgICAgICAgICAgLy8gc2VuZCBtYWlsIHdpdGggZGVmaW5lZCB0cmFuc3BvcnQgb2JqZWN0XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zLCAoZXJyb3IsIGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYi5xdWVyeShzZXRQYXNzd29yZCxbdGVtcF9wYXNzLCB0cnVlLCByZXEuYm9keS5lbWFpbF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycil7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWVzc2FnZSAlcyBzZW50OiAlcycsIGluZm8ubWVzc2FnZUlkLCBpbmZvLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMuanNvbihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbn0iXX0=
