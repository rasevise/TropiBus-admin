"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
function drivers(app) {
    var _driversURL = '/drivers';
    app.get(_driversURL, function (req, res, next) {
        console.log('getting messages from server: ');
        res.contentType('application/json');
        db.query('SELECT * FROM Driver ORDER BY driver_status, driver_firstname', null, function (err, results) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            res.json(results.rows);
        });
    });
    app.post(_driversURL + '/addDriver', function (req, res, next) {
        var status = 'not logged';
        console.log('password:' + req.body.password);
        db.query('INSERT INTO driver( driver_firstname, driver_lastname, driver_username, driver_password, driver_status) VALUES ($1,$2,$3,$4,$5)', [req.body.name, req.body.lastName, req.body.username, req.body.password, status], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            res.send(result);
        });
    });
    app.put(_driversURL + '/updateDriver', function (req, res, next) {
        db.query('UPDATE driver SET driver_firstname = $2, driver_lastname = $3,  driver_username = $4 WHERE driver_id = $1', [req.body.id, req.body.name, req.body.lastName, req.body.username], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            res.send(result);
        });
    });
    app.put(_driversURL + '/updatePassword', function (req, res, next) {
        db.query('UPDATE driver SET  driver_password = $2 WHERE driver_id = $1', [req.body.id, req.body.password], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            res.send(result);
        });
    });
    app.delete(_driversURL + '/deleteDriver', function (req, res, next) {
        db.query('DELETE FROM driver WHERE driver_id = $1', [req.query.id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            res.send(result);
        });
    });
}
exports.drivers = drivers;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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R0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFDLEdBQU8sRUFBRSxNQUFVO1lBQzdILEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUdILEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLGVBQWUsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUN2RCxFQUFFLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFDLEdBQU8sRUFBRSxNQUFVO1lBQ3JGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUEzREQsMEJBMkRDIiwiZmlsZSI6InNlcnZpY2VzL2RyaXZlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGIvcGcnO1xuXG5leHBvcnQgZnVuY3Rpb24gZHJpdmVycyhhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcblxubGV0IF9kcml2ZXJzVVJMID0gJy9kcml2ZXJzJztcblxuYXBwLmdldChfZHJpdmVyc1VSTCwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnNvbGUubG9nKCdnZXR0aW5nIG1lc3NhZ2VzIGZyb20gc2VydmVyOiAnKTtcbiAgcmVzLmNvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIGRiLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIERyaXZlciBPUkRFUiBCWSBkcml2ZXJfc3RhdHVzLCBkcml2ZXJfZmlyc3RuYW1lJywgbnVsbCwgKGVycjphbnksIHJlc3VsdHM6YW55KSA9PiB7XG4gICAgaWYoZXJyKSB7XG4gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIGVycik7XG4gICAgICAgICAgICByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgfVxuICAgIHJlcy5qc29uKHJlc3VsdHMucm93cyk7XG4gIH0pO1xufSk7XG5cbmFwcC5wb3N0KF9kcml2ZXJzVVJMICsgJy9hZGREcml2ZXInLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdmFyIHN0YXR1cyA9ICdub3QgbG9nZ2VkJztcbiAgY29uc29sZS5sb2coJ3Bhc3N3b3JkOicgKyByZXEuYm9keS5wYXNzd29yZCk7XG4gIGRiLnF1ZXJ5KCdJTlNFUlQgSU5UTyBkcml2ZXIoIGRyaXZlcl9maXJzdG5hbWUsIGRyaXZlcl9sYXN0bmFtZSwgZHJpdmVyX3VzZXJuYW1lLCBkcml2ZXJfcGFzc3dvcmQsIGRyaXZlcl9zdGF0dXMpIFZBTFVFUyAoJDEsJDIsJDMsJDQsJDUpJywgW3JlcS5ib2R5Lm5hbWUscmVxLmJvZHkubGFzdE5hbWUscmVxLmJvZHkudXNlcm5hbWUscmVxLmJvZHkucGFzc3dvcmQsIHN0YXR1c10sIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgaWYoZXJyKSB7XG4gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIGVycik7XG4gICAgICAgICAgICByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgfVxuICAgIHJlcy5zZW5kKHJlc3VsdCk7XG4gIH0pO1xufSk7XG5cbmFwcC5wdXQoX2RyaXZlcnNVUkwgKyAnL3VwZGF0ZURyaXZlcicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBkYi5xdWVyeSgnVVBEQVRFIGRyaXZlciBTRVQgZHJpdmVyX2ZpcnN0bmFtZSA9ICQyLCBkcml2ZXJfbGFzdG5hbWUgPSAkMywgIGRyaXZlcl91c2VybmFtZSA9ICQ0IFdIRVJFIGRyaXZlcl9pZCA9ICQxJywgW3JlcS5ib2R5LmlkLCByZXEuYm9keS5uYW1lLCByZXEuYm9keS5sYXN0TmFtZSwgcmVxLmJvZHkudXNlcm5hbWVdLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgY29uc29sZS5lcnJvciggZXJyKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcbiAgICB9XG4gICAgcmVzLnNlbmQocmVzdWx0KTtcbiAgfSk7XG59KTtcblxuYXBwLnB1dChfZHJpdmVyc1VSTCArICcvdXBkYXRlUGFzc3dvcmQnLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgZGIucXVlcnkoJ1VQREFURSBkcml2ZXIgU0VUICBkcml2ZXJfcGFzc3dvcmQgPSAkMiBXSEVSRSBkcml2ZXJfaWQgPSAkMScsIFtyZXEuYm9keS5pZCwgcmVxLmJvZHkucGFzc3dvcmRdLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgY29uc29sZS5lcnJvciggZXJyKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcbiAgICB9XG4gICAgcmVzLnNlbmQocmVzdWx0KTtcbiAgfSk7XG59KTtcblxuXG5hcHAuZGVsZXRlKF9kcml2ZXJzVVJMICsgJy9kZWxldGVEcml2ZXInLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgZGIucXVlcnkoJ0RFTEVURSBGUk9NIGRyaXZlciBXSEVSRSBkcml2ZXJfaWQgPSAkMScsW3JlcS5xdWVyeS5pZF0sIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKCBlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgIH1cbiAgICByZXMuc2VuZChyZXN1bHQpO1xuICB9KTtcbn0pO1xuXG59XG4iXX0=
