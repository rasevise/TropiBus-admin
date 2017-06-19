"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
function bustrack(app) {
    var _trackURL = '/bustrackingRoutes';
    var getDriverInfo = 'SELECT driver_id, driver_firstname, driver_lastname, bus_id, bus_name,bus_status, route_id, route_name FROM bus NATURAL JOIN driver NATURAL JOIN route WHERE driver_id = $1';
    var getRoutes = 'SELECT route_name,route_id FROM route';
    var getDriverBusID = 'SELECT bus_id FROM driver WHERE driver_id = $1';
    var getGPSid = 'SELECT gps_id FROM bus WHERE bus_id = $1';
    var getDriverBusGPSid = 'SELECT gps_id FROM bus NATURAL JOIN driver WHERE driver_id = $1';
    var changeDriverRoute = 'UPDATE bus SET route_id = $1 where bus_id=$2';
    var updateDriverBus = 'UPDATE driver SET bus_id= $1 WHERE driver_id = $2';
    var updateBusStatus = 'UPDATE bus SET bus_status = $1 WHERE bus_id = $2';
    var updateBusLocation = 'UPDATE GPS SET gps_latitude = $1, gps_longitude = $2 WHERE gps_id = $3';
    var checkCredentials = 'SELECT driver_id,driver_status,admin_pass FROM driver WHERE driver_username=$1 and driver_password=CRYPT($2,driver_password)';
    var login = 'UPDATE driver SET driver_status = \'logged\' WHERE driver_id = $1';
    var logout = 'UPDATE driver SET driver_status = \'not logged\' WHERE driver_id = $1';
    var disactivateBus = 'UPDATE bus SET bus_status =\'Inactive\' WHERE bus_id=$1';
    var createNewPassword = 'UPDATE driver SET driver_password=CRYPT($1,GEN_SALT(\'bf\')), admin_pass=\'false\' WHERE driver_id=$2';
    app.get(_trackURL + '/getDriverInfo', function (req, res, next) {
        console.log(" getting driver info", req.body);
        db.query(getDriverInfo, [req.query.driver_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            }
            else {
                res.json(result.rows[0]);
                console.log(result.rows[0]);
            }
        });
    });
    app.get(_trackURL + '/getRoutes', function (req, res, next) {
        console.log("getting tim's routes ");
        db.query(getRoutes, null, function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            }
            else {
                res.json(result.rows);
                console.log(result.rows);
            }
        });
    });
    app.put(_trackURL + '/changeDriverRoute', function (req, res, next) {
        console.log("entre a cambiar ruta de conductor", req.body);
        db.query(changeDriverRoute, [req.body.route_id, req.body.bus_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error" + err);
            }
            else {
                db.query(getDriverInfo, [req.body.driver_id], function (err, result) {
                    if (err) {
                        console.error(err);
                        res.send("Error" + err);
                    }
                    else
                        res.json(result.rows[0]);
                });
            }
        });
    });
    app.put(_trackURL + '/updateBusStatus', function (req, res, next) {
        console.log("haciendo update al status del bus", req.body);
        db.query(updateBusStatus, [req.body.bus_status, req.body.bus_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error" + err);
            }
            else {
                db.query(getDriverInfo, [req.body.driver_id], function (err, result) {
                    if (err) {
                        console.error(err);
                        res.send("Error" + err);
                    }
                    else {
                        res.json(result.rows[0]);
                    }
                });
            }
        });
    });
    app.put(_trackURL + '/updateBusLocation', function (req, res, next) {
        console.log("updating bus location", req.body);
        db.query(getDriverBusGPSid, [req.body.driver_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error" + err);
            }
            else {
                var gps_id = result.rows[0].gps_id;
                db.query(updateBusLocation, [req.body.lat, req.body.lng, gps_id], function (err, result) {
                    if (err) {
                        console.error(err);
                        res.send("Error" + err);
                    }
                    else
                        res.json({ success: 1 });
                });
            }
        });
    });
    app.post(_trackURL + '/login', function (req, res, next) {
        console.log("entre al login", req.body);
        db.query(checkCredentials, [req.body.username, req.body.password], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error" + err);
            }
            else {
                if (result.rows.length == 0) {
                    res.json({ driver_id: -1 });
                }
                else {
                    var driver = result.rows[0];
                    if (driver.driver_status == "logged") {
                        res.json({ driver_id: -2 });
                    }
                    else if (driver.admin_pass == true) {
                        res.json({ driver_id: -3 });
                    }
                    else {
                        db.query(login, [driver.driver_id], function (err, result) {
                            if (err) {
                                console.error(err);
                                res.send("Error" + err);
                            }
                            else {
                                res.json({ driver_id: driver.driver_id });
                            }
                        });
                    }
                }
            }
        });
    });
    app.post(_trackURL + '/createNewPassword', function (req, res, next) {
        console.log("submitting new password");
        db.query(checkCredentials, [req.body.username, req.body.password], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error" + err);
            }
            else {
                if (result.rows.length == 0) {
                    res.json({ response: -1 });
                }
                else {
                    var driver = result.rows[0];
                    db.query(createNewPassword, [req.body.newpassword, driver.driver_id], function (err, result) {
                        if (err) {
                            console.error(err);
                            res.send("Error" + err);
                        }
                        else {
                            res.json({ response: 1 });
                        }
                    });
                }
            }
        });
    });
    app.put(_trackURL + '/logout', function (req, res, next) {
        console.log("login out", req.body);
        db.query(logout, [req.body.driver_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error" + err);
            }
            else {
                db.query(disactivateBus, [req.body.bus_id], function (err, result) {
                    if (err) {
                        console.error(err);
                        res.send("Error" + err);
                    }
                    else {
                        res.json({ "success": 1 });
                    }
                });
            }
        });
    });
}
exports.bustrack = bustrack;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2J1c3RyYWNraW5nUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBaUJBLDZCQUErQjtBQUkvQixrQkFBeUIsR0FBd0I7SUFFakQsSUFBTSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7SUFFdkMsSUFBSSxhQUFhLEdBQUcsNktBQTZLLENBQUE7SUFDak0sSUFBSSxTQUFTLEdBQUcsdUNBQXVDLENBQUE7SUFDdkQsSUFBSSxjQUFjLEdBQUcsZ0RBQWdELENBQUE7SUFDckUsSUFBSSxRQUFRLEdBQUcsMENBQTBDLENBQUE7SUFFekQsSUFBSSxpQkFBaUIsR0FBRyxpRUFBaUUsQ0FBQTtJQUt6RixJQUFJLGlCQUFpQixHQUFHLDhDQUE4QyxDQUFBO0lBQ3RFLElBQUksZUFBZSxHQUFHLG1EQUFtRCxDQUFBO0lBQ3pFLElBQUksZUFBZSxHQUFHLGtEQUFrRCxDQUFBO0lBQ3hFLElBQUksaUJBQWlCLEdBQUcsd0VBQXdFLENBQUE7SUFHaEcsSUFBSSxnQkFBZ0IsR0FBRSw4SEFBOEgsQ0FBQztJQUNySixJQUFJLEtBQUssR0FBRyxtRUFBbUUsQ0FBQTtJQUMvRSxJQUFJLE1BQU0sR0FBRyx1RUFBdUUsQ0FBQTtJQUNwRixJQUFJLGNBQWMsR0FBRSx5REFBeUQsQ0FBQTtJQUM3RSxJQUFJLGlCQUFpQixHQUFDLHVHQUF1RyxDQUFBO0lBRzdILEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGdCQUFnQixFQUFFLFVBQUMsR0FBTyxFQUFFLEdBQU8sRUFBRSxJQUFRO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFDLEdBQU8sRUFBRSxNQUFVO1lBRS9ELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUNQLENBQUM7Z0JB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QUksQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFDLEdBQU8sRUFBRSxNQUFVO29CQUUzRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDUixDQUFDO3dCQUNHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixDQUFDO29CQUNELElBQUksQ0FBQSxDQUFDO3dCQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztnQkFDYixDQUFDLENBQUMsQ0FBQztZQUNDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBRUgsQ0FBQztBQTdQRCw0QkE2UEMiLCJmaWxlIjoic2VydmljZXMvYnVzdHJhY2tpbmdSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqIFxyXG4gKiBBdXRob3I6IEx1aXMgVG9yb1xyXG4gKiBDcmVhdGlvbiBEYXRlOiAzLzIzLzIwMTdcclxuICpcclxuICogRGVzY3JpcHRpb246IENvbnRhaW5zIEJ1cyBUcmFja2luZyBhcHAgcm91dGVzIGFuZCBxdWVyaWVzIFxyXG4gKiBcclxuICogUm91dGVzOlxyXG4gKiAvdXBkYXRlUm91dGUgc2VuZCBidXMgaWQgYW5kIHJvdXRlIGlkXHJcbiAqIC9sb2dpbiBzZW5kIHVzZXJuYW1lIHBhc3N3b3JkLCByZXR1cm4gZHJpdmVyIGlkIGlmIHN1Y2Nlc3NmdWwsIHJldHVybiAtMSBpZiB1bnN1Y2Nlc3NmdWxcclxuICogL2xvZ291dCBcclxuICogL2dldERyaXZlciBpbmZvIHdpdGggcm91dGUgYW5kIGJ1cyB3aWxsIGdldCBidXMgbmFtZSwgYnVzIGlkLCBkcml2ZXIgbmFtZSwgZHJpdmVyIGxhc3RuYW1lLCBkcml2ZXIgaWQsIHJvdXRlIGlkLCByb3V0ZSBuYW1lXHJcbiAqIC91cGRhdGUgc3RhdHVzIHBhcmFtIGJ1cyBpZCwgYnVzIHN0YXR1c1xyXG4gKiBnZXRSb3V0ZSBzZW5kIGJhY2sgYWxsIHJvdXRlIGlkcyBhbmQgcm91dGUgbmFtZXNcclxuKiovXHJcblxyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYi9wZyc7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidXN0cmFjayhhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcclxuXHJcbmNvbnN0IF90cmFja1VSTCA9ICcvYnVzdHJhY2tpbmdSb3V0ZXMnO1xyXG4vL1JvdXRlcyBmb3IgZ2V0XHJcbnZhciBnZXREcml2ZXJJbmZvID0gJ1NFTEVDVCBkcml2ZXJfaWQsIGRyaXZlcl9maXJzdG5hbWUsIGRyaXZlcl9sYXN0bmFtZSwgYnVzX2lkLCBidXNfbmFtZSxidXNfc3RhdHVzLCByb3V0ZV9pZCwgcm91dGVfbmFtZSBGUk9NIGJ1cyBOQVRVUkFMIEpPSU4gZHJpdmVyIE5BVFVSQUwgSk9JTiByb3V0ZSBXSEVSRSBkcml2ZXJfaWQgPSAkMScgXHJcbnZhciBnZXRSb3V0ZXMgPSAnU0VMRUNUIHJvdXRlX25hbWUscm91dGVfaWQgRlJPTSByb3V0ZScgLy9TRUxFQ1Qgcm91dGVfaWQscm91dGVfbmFtZSBGUk9NIHJvdXRlXHJcbnZhciBnZXREcml2ZXJCdXNJRCA9ICdTRUxFQ1QgYnVzX2lkIEZST00gZHJpdmVyIFdIRVJFIGRyaXZlcl9pZCA9ICQxJ1xyXG52YXIgZ2V0R1BTaWQgPSAnU0VMRUNUIGdwc19pZCBGUk9NIGJ1cyBXSEVSRSBidXNfaWQgPSAkMSdcclxuXHJcbnZhciBnZXREcml2ZXJCdXNHUFNpZCA9ICdTRUxFQ1QgZ3BzX2lkIEZST00gYnVzIE5BVFVSQUwgSk9JTiBkcml2ZXIgV0hFUkUgZHJpdmVyX2lkID0gJDEnIFxyXG5cclxuXHJcbi8vUm91dGVzIGZvciB1cGRhdGVcclxuXHJcbnZhciBjaGFuZ2VEcml2ZXJSb3V0ZSA9ICdVUERBVEUgYnVzIFNFVCByb3V0ZV9pZCA9ICQxIHdoZXJlIGJ1c19pZD0kMidcclxudmFyIHVwZGF0ZURyaXZlckJ1cyA9ICdVUERBVEUgZHJpdmVyIFNFVCBidXNfaWQ9ICQxIFdIRVJFIGRyaXZlcl9pZCA9ICQyJ1xyXG52YXIgdXBkYXRlQnVzU3RhdHVzID0gJ1VQREFURSBidXMgU0VUIGJ1c19zdGF0dXMgPSAkMSBXSEVSRSBidXNfaWQgPSAkMidcclxudmFyIHVwZGF0ZUJ1c0xvY2F0aW9uID0gJ1VQREFURSBHUFMgU0VUIGdwc19sYXRpdHVkZSA9ICQxLCBncHNfbG9uZ2l0dWRlID0gJDIgV0hFUkUgZ3BzX2lkID0gJDMnXHJcblxyXG4vL1JvdXRlcyBmb3IgbG9naW4vbG9nb3V0IFxyXG52YXIgY2hlY2tDcmVkZW50aWFscz0gJ1NFTEVDVCBkcml2ZXJfaWQsZHJpdmVyX3N0YXR1cyxhZG1pbl9wYXNzIEZST00gZHJpdmVyIFdIRVJFIGRyaXZlcl91c2VybmFtZT0kMSBhbmQgZHJpdmVyX3Bhc3N3b3JkPUNSWVBUKCQyLGRyaXZlcl9wYXNzd29yZCknO1xyXG52YXIgbG9naW4gPSAnVVBEQVRFIGRyaXZlciBTRVQgZHJpdmVyX3N0YXR1cyA9IFxcJ2xvZ2dlZFxcJyBXSEVSRSBkcml2ZXJfaWQgPSAkMSdcclxudmFyIGxvZ291dCA9ICdVUERBVEUgZHJpdmVyIFNFVCBkcml2ZXJfc3RhdHVzID0gXFwnbm90IGxvZ2dlZFxcJyBXSEVSRSBkcml2ZXJfaWQgPSAkMSdcclxudmFyIGRpc2FjdGl2YXRlQnVzPSAnVVBEQVRFIGJ1cyBTRVQgYnVzX3N0YXR1cyA9XFwnSW5hY3RpdmVcXCcgV0hFUkUgYnVzX2lkPSQxJ1xyXG52YXIgY3JlYXRlTmV3UGFzc3dvcmQ9J1VQREFURSBkcml2ZXIgU0VUIGRyaXZlcl9wYXNzd29yZD1DUllQVCgkMSxHRU5fU0FMVChcXCdiZlxcJykpLCBhZG1pbl9wYXNzPVxcJ2ZhbHNlXFwnIFdIRVJFIGRyaXZlcl9pZD0kMidcclxuXHJcbi8vZ2V0IGluZm9ybWF0aW9uIGZyb20gZHJpdmVyIGZyb20gZGF0YWJhc2UgYW5kIHNlbmQgYmFjayB0byBhcHBsaWNhdGlvblxyXG5hcHAuZ2V0KF90cmFja1VSTCArICcvZ2V0RHJpdmVySW5mbycsIChyZXE6YW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4geyAvLyBQYXJhbWV0ZXI6IFJvdXRlIElEXHJcbiAgICBjb25zb2xlLmxvZyhcIiBnZXR0aW5nIGRyaXZlciBpbmZvXCIscmVxLmJvZHkpXHJcbiAgICAgICAgZGIucXVlcnkoZ2V0RHJpdmVySW5mbywgW3JlcS5xdWVyeS5kcml2ZXJfaWRdLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yIFwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93c1swXSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yb3dzWzBdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuLy9nZXQgcm91dGVzIG5hbWVzIGFuZCBpZHMgZnJvbSBkYXRhYmFzZSBhbmQgc2VuZCBiYWNrIHRvIGFwcGxpY2F0aW9uXHJcbmFwcC5nZXQoX3RyYWNrVVJMICsgJy9nZXRSb3V0ZXMnLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHsgLy8gUGFyYW1ldGVyOiBSb3V0ZSBJRFxyXG4gICAgY29uc29sZS5sb2coXCJnZXR0aW5nIHRpbSdzIHJvdXRlcyBcIilcclxuICAgICAgICBkYi5xdWVyeShnZXRSb3V0ZXMsIG51bGwsIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgeyBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKFwiRXJyb3IgXCIgKyBlcnIpOyB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LnJvd3MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG5cclxuLy9jaGFuZ2UgZHJpdmVyIHJvdXRlLCB1cGRhdGluZyBvbiBkYXRhYmFzZSBhbmQgc2VuZGluZyBiYWNrIGRyaXZlciBpbmZvIHRvIGFwcGxpY2F0aW9uXHJcbmFwcC5wdXQoX3RyYWNrVVJMICsgJy9jaGFuZ2VEcml2ZXJSb3V0ZScsIChyZXE6YW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJlbnRyZSBhIGNhbWJpYXIgcnV0YSBkZSBjb25kdWN0b3JcIixyZXEuYm9keSlcclxuICAgICAgICBkYi5xdWVyeShjaGFuZ2VEcml2ZXJSb3V0ZSxbcmVxLmJvZHkucm91dGVfaWQscmVxLmJvZHkuYnVzX2lkXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGRiLnF1ZXJ5KGdldERyaXZlckluZm8sW3JlcS5ib2R5LmRyaXZlcl9pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3NbMF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcbi8vdXBkYXRpbmcgYnVzIHN0YXR1cyBvbiBkYXRhYmFzZSBhbmQgdGhlbiBzZW5kaW5nIGJhY2sgZHJpdmVyIGluZm8gdG8gYXBwbGljYXRpb25cclxuYXBwLnB1dChfdHJhY2tVUkwgKyAnL3VwZGF0ZUJ1c1N0YXR1cycsIChyZXE6YW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJoYWNpZW5kbyB1cGRhdGUgYWwgc3RhdHVzIGRlbCBidXNcIiwgcmVxLmJvZHkpXHJcbiAgICAgICAgZGIucXVlcnkodXBkYXRlQnVzU3RhdHVzLFtyZXEuYm9keS5idXNfc3RhdHVzLHJlcS5ib2R5LmJ1c19pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBkYi5xdWVyeShnZXREcml2ZXJJbmZvLFtyZXEuYm9keS5kcml2ZXJfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93c1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbnVwZGF0ZUJ1c0xvY2F0aW9uIHNlcnZlciByb3V0ZSB1c2UgcnVuIHR3byBxdWVydGllczpcclxuICAgIGdldERyaXZlckJ1c0dQU2lkIFxyXG4gICAgICAgIFBhcmFtZXRlcjogZHJpdmVyX2lkXHJcbiAgICAgICAgR2V0OiBHUFMgSUQgb2YgdGhlIGNvcnJlc3BvbmRpbmcgZHJpdmVyIGJ1c1xyXG5cclxuICAgIHVwZGF0ZUJ1c0xvY2F0aW9uXHJcbiAgICAgICAgUGFyYW1ldGVyOiBncHNfbGF0aXR1ZGUsIGdwc19sb25naXR1ZGUsIGdwc19pZFxyXG4gICAgICAgIFVwZGF0ZTogQWN0dWFsIGxvY2F0aW9uIG9mIHRoZSBidXMgIHVzaWduIGdwc19sYXRpdHVkZSBhbmQgZ3BzX2xvbmdpdHVkZSBwYXJhbWV0ZXJzIFxyXG4qL1xyXG5hcHAucHV0KF90cmFja1VSTCArICcvdXBkYXRlQnVzTG9jYXRpb24nLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHsgXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgYnVzIGxvY2F0aW9uXCIscmVxLmJvZHkpXHJcbiAgICAgXHJcbiAgICAgICAgZGIucXVlcnkoZ2V0RHJpdmVyQnVzR1BTaWQsW3JlcS5ib2R5LmRyaXZlcl9pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB2YXIgZ3BzX2lkID0gcmVzdWx0LnJvd3NbMF0uZ3BzX2lkXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRiLnF1ZXJ5KHVwZGF0ZUJ1c0xvY2F0aW9uLFtyZXEuYm9keS5sYXQscmVxLmJvZHkubG5nLGdwc19pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgeyBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe3N1Y2Nlc3M6MX0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1VwZGF0ZSB0aGUgbG9jYWxpemF0aW9uIG9mIHRoZSBEcml2ZXIgQnVzIHVzaW5nIHRoZSBidXMgR1BTIElEXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vL1JvdXRlcyBmb3IgbG9naW4vbG9nb3V0XHJcbi8vbG9naW4gZHJpdmVyIG9uIHN5c3RlbSwgdXBkYXRpbiBkcml2ZXIgc3RhdHVzIHRvIFwibG9nZ2VkIGluXCIgaWYgY3JlZGVudGlhbHMgYXJlIGNvcnJlY3RcclxuLy9pZiBjcmVkZW50aWFscyBhcmUgaW5jb3JyZWN0IHNlbmQgLTEgYmFjayBhcyBhIHJlc3BvbnNlXHJcbi8vUm91dGVzIGZvciBsb2dpbi9sb2dvdXRcclxuLy9sb2dpbiBkcml2ZXIgb24gc3lzdGVtLCB1cGRhdGluIGRyaXZlciBzdGF0dXMgdG8gXCJsb2dnZWQgaW5cIiBpZiBjcmVkZW50aWFscyBhcmUgY29ycmVjdFxyXG4vL2lmIGNyZWRlbnRpYWxzIGFyZSBpbmNvcnJlY3Qgc2VuZCAtMSBiYWNrIGFzIGEgcmVzcG9uc2VcclxuYXBwLnBvc3QoX3RyYWNrVVJMICsgJy9sb2dpbicsIChyZXE6YW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJlbnRyZSBhbCBsb2dpblwiLHJlcS5ib2R5KVxyXG4gICAgXHJcbiAgICAgICAgZGIucXVlcnkoY2hlY2tDcmVkZW50aWFscyxbcmVxLmJvZHkudXNlcm5hbWUsIHJlcS5ib2R5LnBhc3N3b3JkXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgXHJcbiAgICAgICAgICAgICAgICAgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNleyAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgaWYocmVzdWx0LnJvd3MubGVuZ3RoPT0wKXtcclxuICAgICAgICAgICAgICAgICAvL2NyZWRlbnRpYWxzIGFyZSBpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICAgcmVzLmpzb24oe2RyaXZlcl9pZDotMX0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBkcml2ZXI9cmVzdWx0LnJvd3NbMF1cclxuICAgICAgICAgICAgICAgIGlmKGRyaXZlci5kcml2ZXJfc3RhdHVzPT1cImxvZ2dlZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAvL29uZSBkcml2ZXIgaXMgYWxyZWFkeSBsb2dnZWRcclxuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7ZHJpdmVyX2lkOi0yfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGRyaXZlci5hZG1pbl9wYXNzPT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvL2FkbWluIHNldCBwYXNzd29yZCB0byB0aGlzIGRyaXZlclxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtkcml2ZXJfaWQ6LTN9KTtcclxuICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgIGVsc2V7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi5xdWVyeShsb2dpbixbZHJpdmVyLmRyaXZlcl9pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtkcml2ZXJfaWQ6ZHJpdmVyLmRyaXZlcl9pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5wb3N0KF90cmFja1VSTCArICcvY3JlYXRlTmV3UGFzc3dvcmQnLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwic3VibWl0dGluZyBuZXcgcGFzc3dvcmRcIilcclxuICAgICAgICBkYi5xdWVyeShjaGVja0NyZWRlbnRpYWxzLFtyZXEuYm9keS51c2VybmFtZSwgcmVxLmJvZHkucGFzc3dvcmRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyBcclxuICAgICAgICAgICAgICAgICByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpOyB9XHJcbiAgICAgICAgICAgIGVsc2V7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBpZihyZXN1bHQucm93cy5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgIC8vY3JlZGVudGlhbHMgYXJlIGludmFsaWRcclxuICAgICAgICAgICAgICAgICByZXMuanNvbih7cmVzcG9uc2U6LTF9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHJpdmVyPXJlc3VsdC5yb3dzWzBdICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi5xdWVyeShjcmVhdGVOZXdQYXNzd29yZCxbcmVxLmJvZHkubmV3cGFzc3dvcmQsZHJpdmVyLmRyaXZlcl9pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe3Jlc3BvbnNlOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8vbG9naW5nIG91dCBkcml2ZXIsIHVwZHRpbmcgZHJpdmVyIHN0YXR1cyBvbiBkYXRhYmFzZVxyXG5hcHAucHV0KF90cmFja1VSTCArICcvbG9nb3V0JywgKHJlcTphbnksIHJlczphbnksIG5leHQ6YW55KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcImxvZ2luIG91dFwiLHJlcS5ib2R5KVxyXG4gICAgICAgIGRiLnF1ZXJ5KGxvZ291dCxbcmVxLmJvZHkuZHJpdmVyX2lkXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyBcclxuICAgICAgICAgICAgICAgICByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZGIucXVlcnkoZGlzYWN0aXZhdGVCdXMsW3JlcS5ib2R5LmJ1c19pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcInN1Y2Nlc3NcIjoxfSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcbn1cclxuIl19
