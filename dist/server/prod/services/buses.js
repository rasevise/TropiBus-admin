"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
function buses(app) {
    var _busesURL = '/buses';
    app.get(_busesURL, function (req, res, next) {
        console.log('getting buses from server: ');
        res.contentType('application/json');
        db.query('SELECT * FROM Bus NATURAL LEFT JOIN Driver ORDER BY bus_status, bus_name', null, function (err, results) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.json(results.rows);
            }
        });
    });
    app.post(_busesURL + '/addBus', function (req, res, next) {
        console.log('Create a bus');
        var id = 0;
        var status;
        db.query('INSERT INTO GPS(gps_latitude, gps_longitude) VALUES(0,0) RETURNING gps_id', null, function (err, res1) {
            if (err) {
                console.error(err);
                res1.send('Error ' + err);
            }
            else {
                console.log('Result:', res);
                id = res1.rows[0].gps_id;
                status = 'inactive';
                console.log('GPS ID', id);
                db.query('INSERT INTO Bus( bus_name, gps_id, bus_status, route_id) VALUES ($1,$2, $3,$4) RETURNING bus_id', [req.body.name, id, req.body.status, req.body.routeid], function (err, result1) {
                    if (err) {
                        console.error(err);
                        res.send('Error ' + err);
                    }
                    else {
                        console.log('entre a meter driver', result1);
                        var b_id = result1.rows[0].bus_id;
                        db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2', [b_id, req.body.driverid], function (err, result2) {
                            {
                                res.send(result1);
                            }
                        });
                    }
                });
            }
        });
    });
    app.put(_busesURL + '/updateBus', function (req, res, next) {
        console.log('edit id:' + req.body.id);
        db.query('UPDATE Bus SET bus_name=$2, bus_status=$3, route_id=$4 WHERE bus_id=$1 RETURNING bus_id', [req.body.id, req.body.name, req.body.status, req.body.routeid], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2', [null, req.body.olddriverid], function (err, result1) {
                    if (err) {
                        console.error(err);
                        res.send('Error ' + err);
                    }
                    else {
                        var b_id = result.rows[0].bus_id;
                        db.query('UPDATE driver SET bus_id=$1 WHERE driver_id=$2', [b_id, req.body.driverid], function (err, result) {
                            {
                                res.send(result);
                            }
                        });
                    }
                });
            }
        });
    });
    app.delete(_busesURL + '/deleteBus', function (req, res, next) {
        console.log('id:' + req.query.id);
        db.query('UPDATE driver SET bus_id=Null WHERE bus_id=$1', [req.query.id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                db.query('DELETE FROM Bus WHERE bus_id=$1 RETURNING gps_id', [req.query.id], function (err, result1) {
                    if (err) {
                        console.error(err);
                        res.send('Error ' + err);
                    }
                    else {
                        db.query('DELETE FROM gps WHERE gps_id=$1', [result1.rows[0].gps_id], function (err, result2) {
                            if (err) {
                                console.error(err);
                                res.send('Error ' + err);
                                ;
                            }
                            res.send(result2);
                        });
                    }
                });
            }
        });
    });
}
exports.buses = buses;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFDO3dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUM3QixDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQUMsR0FBTyxFQUFFLE9BQVc7NEJBQ3hGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUMsQ0FBQztnQ0FDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0NBQUEsQ0FBQzs0QkFDMUIsQ0FBQzs0QkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNwQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxDQUFDO0FBeEdELHNCQXdHQyIsImZpbGUiOiJzZXJ2aWNlcy9idXNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYi9wZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBidXNlcyhhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcblxubGV0IF9idXNlc1VSTCA9ICcvYnVzZXMnO1xuXG5hcHAuZ2V0KF9idXNlc1VSTCwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2dldHRpbmcgYnVzZXMgZnJvbSBzZXJ2ZXI6ICcpO1xuICAgIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGRiLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIEJ1cyBOQVRVUkFMIExFRlQgSk9JTiBEcml2ZXIgT1JERVIgQlkgYnVzX3N0YXR1cywgYnVzX25hbWUnLCBudWxsLCAgKGVycjphbnksIHJlc3VsdHM6YW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgICB9IGVsc2V7XG4gICAgICByZXMuanNvbihyZXN1bHRzLnJvd3MpO1xuICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuYXBwLnBvc3QoX2J1c2VzVVJMICsgJy9hZGRCdXMnLCAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICAgIGNvbnNvbGUubG9nKCdDcmVhdGUgYSBidXMnKTtcbiAgICB2YXIgaWQgPSAwO1xuICAgIHZhciBzdGF0dXM7XG5cbiAgICBkYi5xdWVyeSgnSU5TRVJUIElOVE8gR1BTKGdwc19sYXRpdHVkZSwgZ3BzX2xvbmdpdHVkZSkgVkFMVUVTKDAsMCkgUkVUVVJOSU5HIGdwc19pZCcsIG51bGwsIChlcnI6YW55LCByZXMxOmFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKCBlcnIpO1xuICAgICAgICAgICAgcmVzMS5zZW5kKCdFcnJvciAnICsgZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnUmVzdWx0OicsIHJlcyk7XG4gICAgICBpZCA9IHJlczEucm93c1swXS5ncHNfaWQ7XG4gICAgICBzdGF0dXMgPSAnaW5hY3RpdmUnO1xuICAgICAgY29uc29sZS5sb2coJ0dQUyBJRCcgLCBpZCk7XG4gICAgICBkYi5xdWVyeSgnSU5TRVJUIElOVE8gQnVzKCBidXNfbmFtZSwgZ3BzX2lkLCBidXNfc3RhdHVzLCByb3V0ZV9pZCkgVkFMVUVTICgkMSwkMiwgJDMsJDQpIFJFVFVSTklORyBidXNfaWQnLFsgcmVxLmJvZHkubmFtZSwgaWQsIHJlcS5ib2R5LnN0YXR1cywgcmVxLmJvZHkucm91dGVpZF0sIChlcnI6YW55LCByZXN1bHQxOmFueSkgPT4ge1xuICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKCBlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZW50cmUgYSBtZXRlciBkcml2ZXInLHJlc3VsdDEpO1xuICAgICAgICAgIHZhciBiX2lkID0gcmVzdWx0MS5yb3dzWzBdLmJ1c19pZDtcbiAgICAgICAgICBkYi5xdWVyeSgnVVBEQVRFIGRyaXZlciBTRVQgYnVzX2lkPSQxIFdIRVJFIGRyaXZlcl9pZD0kMicsW2JfaWQscmVxLmJvZHkuZHJpdmVyaWRdLCAoZXJyOmFueSwgcmVzdWx0MjphbnkpID0+IHtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0MSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuXG5hcHAucHV0KF9idXNlc1VSTCArICcvdXBkYXRlQnVzJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cbiAgICBjb25zb2xlLmxvZygnZWRpdCBpZDonICsgcmVxLmJvZHkuaWQpO1xuICAgIGRiLnF1ZXJ5KCdVUERBVEUgQnVzIFNFVCBidXNfbmFtZT0kMiwgYnVzX3N0YXR1cz0kMywgcm91dGVfaWQ9JDQgV0hFUkUgYnVzX2lkPSQxIFJFVFVSTklORyBidXNfaWQnLCBbIHJlcS5ib2R5LmlkLHJlcS5ib2R5Lm5hbWUsIHJlcS5ib2R5LnN0YXR1cywgcmVxLmJvZHkucm91dGVpZF0sIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIGVycik7XG4gICAgICAgICAgICByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZGIucXVlcnkoJ1VQREFURSBkcml2ZXIgU0VUIGJ1c19pZD0kMSBXSEVSRSBkcml2ZXJfaWQ9JDInLFtudWxsLCByZXEuYm9keS5vbGRkcml2ZXJpZF0sIChlcnI6YW55LCByZXN1bHQxOmFueSkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgY29uc29sZS5lcnJvciggZXJyKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBiX2lkID0gcmVzdWx0LnJvd3NbMF0uYnVzX2lkO1xuICAgICAgICAgICAgZGIucXVlcnkoJ1VQREFURSBkcml2ZXIgU0VUIGJ1c19pZD0kMSBXSEVSRSBkcml2ZXJfaWQ9JDInLFtiX2lkLHJlcS5ib2R5LmRyaXZlcmlkXSwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG5cbmFwcC5kZWxldGUoX2J1c2VzVVJMICsgJy9kZWxldGVCdXMnLCAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBjb25zb2xlLmxvZygnaWQ6JyArIHJlcS5xdWVyeS5pZClcbiAgZGIucXVlcnkoJ1VQREFURSBkcml2ZXIgU0VUIGJ1c19pZD1OdWxsIFdIRVJFIGJ1c19pZD0kMScsW3JlcS5xdWVyeS5pZF0sIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKCBlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgIH1lbHNle1xuICAgICAgZGIucXVlcnkoJ0RFTEVURSBGUk9NIEJ1cyBXSEVSRSBidXNfaWQ9JDEgUkVUVVJOSU5HIGdwc19pZCcsW3JlcS5xdWVyeS5pZF0sIChlcnI6YW55LCByZXN1bHQxOmFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIGVycik7XG4gICAgICAgICAgICByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGRiLnF1ZXJ5KCdERUxFVEUgRlJPTSBncHMgV0hFUkUgZ3BzX2lkPSQxJyxbcmVzdWx0MS5yb3dzWzBdLmdwc19pZF0sIChlcnI6YW55LCByZXN1bHQyOmFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKCBlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpOztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdDIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbn1cbiJdfQ==
