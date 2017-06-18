"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
function bustrack(app) {
    var getDriverInfo = 'SELECT driver_id, driver_firstname, driver_lastname, bus_id, bus_name,bus_status, route_id, route_name FROM bus NATURAL JOIN driver NATURAL JOIN route WHERE driver_id = $1';
    var getRoutes = 'SELECT route_name,route_id FROM route';
    var getDriverBusID = 'SELECT bus_id FROM driver WHERE driver_id = $1';
    var getGPSid = 'SELECT gps_id FROM bus WHERE bus_id = $1';
    var getDriverBusGPSid = 'SELECT gps_id FROM bus NATURAL JOIN driver WHERE driver_id = $1';
    var changeDriverRoute = 'UPDATE bus SET route_id = $1 where bus_id=$2';
    var updateDriverBus = 'UPDATE driver SET bus_id= $1 WHERE driver_id = $2';
    var updateBusStatus = 'UPDATE bus SET bus_status = $1 WHERE bus_id = $2';
    var updateBusLocation = 'UPDATE GPS SET gps_latitude = $1, gps_longitude = $2 WHERE gps_id = $3';
    var checkCredentials = "SELECT driver_id,driver_status,admin_pass FROM driver WHERE driver_username=$1 and driver_password=$2";
    var login = 'UPDATE driver SET driver_status = \'logged\' WHERE driver_id = $1';
    var logout = 'UPDATE driver SET driver_status = \'not logged\' WHERE driver_id = $1';
    var disactivateBus = 'UPDATE bus SET bus_status =\'Inactive\' WHERE bus_id=$1';
    var createNewPassword = 'UPDATE driver SET driver_password=$1, admin_pass=\'false\' WHERE driver_id=$2';
    app.get('/getDriverInfo', function (req, res, next) {
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
    app.get('/getRoutes', function (req, res, next) {
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
    app.put('/changeDriverRoute', function (req, res, next) {
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
    app.put('/updateBusStatus', function (req, res, next) {
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
    app.put('/updateBusLocation', function (req, res, next) {
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
    app.post('/login', function (req, res, next) {
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
    app.post('/createNewPassword', function (req, res, next) {
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
    app.put('/logout', function (req, res, next) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2J1c3RyYWNraW5nUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBaUJBLDZCQUErQjtBQUkvQixrQkFBeUIsR0FBd0I7SUFHakQsSUFBSSxhQUFhLEdBQUcsNktBQTZLLENBQUE7SUFDak0sSUFBSSxTQUFTLEdBQUcsdUNBQXVDLENBQUE7SUFDdkQsSUFBSSxjQUFjLEdBQUcsZ0RBQWdELENBQUE7SUFDckUsSUFBSSxRQUFRLEdBQUcsMENBQTBDLENBQUE7SUFFekQsSUFBSSxpQkFBaUIsR0FBRyxpRUFBaUUsQ0FBQTtJQUt6RixJQUFJLGlCQUFpQixHQUFHLDhDQUE4QyxDQUFBO0lBQ3RFLElBQUksZUFBZSxHQUFHLG1EQUFtRCxDQUFBO0lBQ3pFLElBQUksZUFBZSxHQUFHLGtEQUFrRCxDQUFBO0lBQ3hFLElBQUksaUJBQWlCLEdBQUcsd0VBQXdFLENBQUE7SUFHaEcsSUFBSSxnQkFBZ0IsR0FBRSx1R0FBdUcsQ0FBQTtJQUM3SCxJQUFJLEtBQUssR0FBRyxtRUFBbUUsQ0FBQTtJQUMvRSxJQUFJLE1BQU0sR0FBRyx1RUFBdUUsQ0FBQTtJQUNwRixJQUFJLGNBQWMsR0FBRSx5REFBeUQsQ0FBQTtJQUM3RSxJQUFJLGlCQUFpQixHQUFDLCtFQUErRSxDQUFBO0lBSXJHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxHQUFPLEVBQUUsR0FBTyxFQUFFLElBQVE7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFFL0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1AsQ0FBQztnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFD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QUcsQ0FBQyxDQUFDO3dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztvQkFDRCxJQUFJLENBQUEsQ0FBQzt3QkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7b0JBQzVCLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7WUFDQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUE3UEQsNEJBNlBDIiwiZmlsZSI6InNlcnZpY2VzL2J1c3RyYWNraW5nUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKiBcclxuICogQXV0aG9yOiBMdWlzIFRvcm9cclxuICogQ3JlYXRpb24gRGF0ZTogMy8yMy8yMDE3XHJcbiAqXHJcbiAqIERlc2NyaXB0aW9uOiBDb250YWlucyBCdXMgVHJhY2tpbmcgYXBwIHJvdXRlcyBhbmQgcXVlcmllcyBcclxuICogXHJcbiAqIFJvdXRlczpcclxuICogL3VwZGF0ZVJvdXRlIHNlbmQgYnVzIGlkIGFuZCByb3V0ZSBpZFxyXG4gKiAvbG9naW4gc2VuZCB1c2VybmFtZSBwYXNzd29yZCwgcmV0dXJuIGRyaXZlciBpZCBpZiBzdWNjZXNzZnVsLCByZXR1cm4gLTEgaWYgdW5zdWNjZXNzZnVsXHJcbiAqIC9sb2dvdXQgXHJcbiAqIC9nZXREcml2ZXIgaW5mbyB3aXRoIHJvdXRlIGFuZCBidXMgd2lsbCBnZXQgYnVzIG5hbWUsIGJ1cyBpZCwgZHJpdmVyIG5hbWUsIGRyaXZlciBsYXN0bmFtZSwgZHJpdmVyIGlkLCByb3V0ZSBpZCwgcm91dGUgbmFtZVxyXG4gKiAvdXBkYXRlIHN0YXR1cyBwYXJhbSBidXMgaWQsIGJ1cyBzdGF0dXNcclxuICogZ2V0Um91dGUgc2VuZCBiYWNrIGFsbCByb3V0ZSBpZHMgYW5kIHJvdXRlIG5hbWVzXHJcbioqL1xyXG5cclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGIvcGcnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVzdHJhY2soYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XHJcblxyXG4vL1JvdXRlcyBmb3IgZ2V0XHJcbnZhciBnZXREcml2ZXJJbmZvID0gJ1NFTEVDVCBkcml2ZXJfaWQsIGRyaXZlcl9maXJzdG5hbWUsIGRyaXZlcl9sYXN0bmFtZSwgYnVzX2lkLCBidXNfbmFtZSxidXNfc3RhdHVzLCByb3V0ZV9pZCwgcm91dGVfbmFtZSBGUk9NIGJ1cyBOQVRVUkFMIEpPSU4gZHJpdmVyIE5BVFVSQUwgSk9JTiByb3V0ZSBXSEVSRSBkcml2ZXJfaWQgPSAkMScgXHJcbnZhciBnZXRSb3V0ZXMgPSAnU0VMRUNUIHJvdXRlX25hbWUscm91dGVfaWQgRlJPTSByb3V0ZScgLy9TRUxFQ1Qgcm91dGVfaWQscm91dGVfbmFtZSBGUk9NIHJvdXRlXHJcbnZhciBnZXREcml2ZXJCdXNJRCA9ICdTRUxFQ1QgYnVzX2lkIEZST00gZHJpdmVyIFdIRVJFIGRyaXZlcl9pZCA9ICQxJ1xyXG52YXIgZ2V0R1BTaWQgPSAnU0VMRUNUIGdwc19pZCBGUk9NIGJ1cyBXSEVSRSBidXNfaWQgPSAkMSdcclxuXHJcbnZhciBnZXREcml2ZXJCdXNHUFNpZCA9ICdTRUxFQ1QgZ3BzX2lkIEZST00gYnVzIE5BVFVSQUwgSk9JTiBkcml2ZXIgV0hFUkUgZHJpdmVyX2lkID0gJDEnIFxyXG5cclxuXHJcbi8vUm91dGVzIGZvciB1cGRhdGVcclxuXHJcbnZhciBjaGFuZ2VEcml2ZXJSb3V0ZSA9ICdVUERBVEUgYnVzIFNFVCByb3V0ZV9pZCA9ICQxIHdoZXJlIGJ1c19pZD0kMidcclxudmFyIHVwZGF0ZURyaXZlckJ1cyA9ICdVUERBVEUgZHJpdmVyIFNFVCBidXNfaWQ9ICQxIFdIRVJFIGRyaXZlcl9pZCA9ICQyJ1xyXG52YXIgdXBkYXRlQnVzU3RhdHVzID0gJ1VQREFURSBidXMgU0VUIGJ1c19zdGF0dXMgPSAkMSBXSEVSRSBidXNfaWQgPSAkMidcclxudmFyIHVwZGF0ZUJ1c0xvY2F0aW9uID0gJ1VQREFURSBHUFMgU0VUIGdwc19sYXRpdHVkZSA9ICQxLCBncHNfbG9uZ2l0dWRlID0gJDIgV0hFUkUgZ3BzX2lkID0gJDMnXHJcblxyXG4vL1JvdXRlcyBmb3IgbG9naW4vbG9nb3V0IFxyXG52YXIgY2hlY2tDcmVkZW50aWFscz0gXCJTRUxFQ1QgZHJpdmVyX2lkLGRyaXZlcl9zdGF0dXMsYWRtaW5fcGFzcyBGUk9NIGRyaXZlciBXSEVSRSBkcml2ZXJfdXNlcm5hbWU9JDEgYW5kIGRyaXZlcl9wYXNzd29yZD0kMlwiXHJcbnZhciBsb2dpbiA9ICdVUERBVEUgZHJpdmVyIFNFVCBkcml2ZXJfc3RhdHVzID0gXFwnbG9nZ2VkXFwnIFdIRVJFIGRyaXZlcl9pZCA9ICQxJ1xyXG52YXIgbG9nb3V0ID0gJ1VQREFURSBkcml2ZXIgU0VUIGRyaXZlcl9zdGF0dXMgPSBcXCdub3QgbG9nZ2VkXFwnIFdIRVJFIGRyaXZlcl9pZCA9ICQxJ1xyXG52YXIgZGlzYWN0aXZhdGVCdXM9ICdVUERBVEUgYnVzIFNFVCBidXNfc3RhdHVzID1cXCdJbmFjdGl2ZVxcJyBXSEVSRSBidXNfaWQ9JDEnXHJcbnZhciBjcmVhdGVOZXdQYXNzd29yZD0nVVBEQVRFIGRyaXZlciBTRVQgZHJpdmVyX3Bhc3N3b3JkPSQxLCBhZG1pbl9wYXNzPVxcJ2ZhbHNlXFwnIFdIRVJFIGRyaXZlcl9pZD0kMidcclxuXHJcblxyXG4vL2dldCBpbmZvcm1hdGlvbiBmcm9tIGRyaXZlciBmcm9tIGRhdGFiYXNlIGFuZCBzZW5kIGJhY2sgdG8gYXBwbGljYXRpb25cclxuYXBwLmdldCgnL2dldERyaXZlckluZm8nLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHsgLy8gUGFyYW1ldGVyOiBSb3V0ZSBJRFxyXG4gICAgY29uc29sZS5sb2coXCIgZ2V0dGluZyBkcml2ZXIgaW5mb1wiLHJlcS5ib2R5KVxyXG4gICAgICAgIGRiLnF1ZXJ5KGdldERyaXZlckluZm8sIFtyZXEucXVlcnkuZHJpdmVyX2lkXSwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoXCJFcnJvciBcIiArIGVycik7IH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3NbMF0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQucm93c1swXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcbi8vZ2V0IHJvdXRlcyBuYW1lcyBhbmQgaWRzIGZyb20gZGF0YWJhc2UgYW5kIHNlbmQgYmFjayB0byBhcHBsaWNhdGlvblxyXG5hcHAuZ2V0KCcvZ2V0Um91dGVzJywgKHJlcTphbnksIHJlczphbnksIG5leHQ6YW55KSA9PiB7IC8vIFBhcmFtZXRlcjogUm91dGUgSURcclxuICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyB0aW0ncyByb3V0ZXMgXCIpXHJcbiAgICAgICAgZGIucXVlcnkoZ2V0Um91dGVzLCBudWxsLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yIFwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5yb3dzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8vY2hhbmdlIGRyaXZlciByb3V0ZSwgdXBkYXRpbmcgb24gZGF0YWJhc2UgYW5kIHNlbmRpbmcgYmFjayBkcml2ZXIgaW5mbyB0byBhcHBsaWNhdGlvblxyXG5hcHAucHV0KCcvY2hhbmdlRHJpdmVyUm91dGUnLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiZW50cmUgYSBjYW1iaWFyIHJ1dGEgZGUgY29uZHVjdG9yXCIscmVxLmJvZHkpXHJcbiAgICAgICAgZGIucXVlcnkoY2hhbmdlRHJpdmVyUm91dGUsW3JlcS5ib2R5LnJvdXRlX2lkLHJlcS5ib2R5LmJ1c19pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBkYi5xdWVyeShnZXREcml2ZXJJbmZvLFtyZXEuYm9keS5kcml2ZXJfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzWzBdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG4vL3VwZGF0aW5nIGJ1cyBzdGF0dXMgb24gZGF0YWJhc2UgYW5kIHRoZW4gc2VuZGluZyBiYWNrIGRyaXZlciBpbmZvIHRvIGFwcGxpY2F0aW9uXHJcbmFwcC5wdXQoJy91cGRhdGVCdXNTdGF0dXMnLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiaGFjaWVuZG8gdXBkYXRlIGFsIHN0YXR1cyBkZWwgYnVzXCIsIHJlcS5ib2R5KVxyXG4gICAgICAgIGRiLnF1ZXJ5KHVwZGF0ZUJ1c1N0YXR1cyxbcmVxLmJvZHkuYnVzX3N0YXR1cyxyZXEuYm9keS5idXNfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZGIucXVlcnkoZ2V0RHJpdmVySW5mbyxbcmVxLmJvZHkuZHJpdmVyX2lkXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3NbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG4vKlxyXG51cGRhdGVCdXNMb2NhdGlvbiBzZXJ2ZXIgcm91dGUgdXNlIHJ1biB0d28gcXVlcnRpZXM6XHJcbiAgICBnZXREcml2ZXJCdXNHUFNpZCBcclxuICAgICAgICBQYXJhbWV0ZXI6IGRyaXZlcl9pZFxyXG4gICAgICAgIEdldDogR1BTIElEIG9mIHRoZSBjb3JyZXNwb25kaW5nIGRyaXZlciBidXNcclxuXHJcbiAgICB1cGRhdGVCdXNMb2NhdGlvblxyXG4gICAgICAgIFBhcmFtZXRlcjogZ3BzX2xhdGl0dWRlLCBncHNfbG9uZ2l0dWRlLCBncHNfaWRcclxuICAgICAgICBVcGRhdGU6IEFjdHVhbCBsb2NhdGlvbiBvZiB0aGUgYnVzICB1c2lnbiBncHNfbGF0aXR1ZGUgYW5kIGdwc19sb25naXR1ZGUgcGFyYW1ldGVycyBcclxuKi9cclxuYXBwLnB1dCgnL3VwZGF0ZUJ1c0xvY2F0aW9uJywgKHJlcTphbnksIHJlczphbnksIG5leHQ6YW55KSA9PiB7IFxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0aW5nIGJ1cyBsb2NhdGlvblwiLHJlcS5ib2R5KVxyXG4gICAgIFxyXG4gICAgICAgIGRiLnF1ZXJ5KGdldERyaXZlckJ1c0dQU2lkLFtyZXEuYm9keS5kcml2ZXJfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgeyBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdmFyIGdwc19pZCA9IHJlc3VsdC5yb3dzWzBdLmdwc19pZFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkYi5xdWVyeSh1cGRhdGVCdXNMb2NhdGlvbixbcmVxLmJvZHkubGF0LHJlcS5ib2R5LmxuZyxncHNfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHsgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtzdWNjZXNzOjF9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9VcGRhdGUgdGhlIGxvY2FsaXphdGlvbiBvZiB0aGUgRHJpdmVyIEJ1cyB1c2luZyB0aGUgYnVzIEdQUyBJRFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy9Sb3V0ZXMgZm9yIGxvZ2luL2xvZ291dFxyXG4vL2xvZ2luIGRyaXZlciBvbiBzeXN0ZW0sIHVwZGF0aW4gZHJpdmVyIHN0YXR1cyB0byBcImxvZ2dlZCBpblwiIGlmIGNyZWRlbnRpYWxzIGFyZSBjb3JyZWN0XHJcbi8vaWYgY3JlZGVudGlhbHMgYXJlIGluY29ycmVjdCBzZW5kIC0xIGJhY2sgYXMgYSByZXNwb25zZVxyXG4vL1JvdXRlcyBmb3IgbG9naW4vbG9nb3V0XHJcbi8vbG9naW4gZHJpdmVyIG9uIHN5c3RlbSwgdXBkYXRpbiBkcml2ZXIgc3RhdHVzIHRvIFwibG9nZ2VkIGluXCIgaWYgY3JlZGVudGlhbHMgYXJlIGNvcnJlY3RcclxuLy9pZiBjcmVkZW50aWFscyBhcmUgaW5jb3JyZWN0IHNlbmQgLTEgYmFjayBhcyBhIHJlc3BvbnNlXHJcbmFwcC5wb3N0KCcvbG9naW4nLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiZW50cmUgYWwgbG9naW5cIixyZXEuYm9keSlcclxuICAgIFxyXG4gICAgICAgIGRiLnF1ZXJ5KGNoZWNrQ3JlZGVudGlhbHMsW3JlcS5ib2R5LnVzZXJuYW1lLCByZXEuYm9keS5wYXNzd29yZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IFxyXG4gICAgICAgICAgICAgICAgIHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IH1cclxuICAgICAgICAgICAgZWxzZXsgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGlmKHJlc3VsdC5yb3dzLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgICAgICAgLy9jcmVkZW50aWFscyBhcmUgaW52YWxpZFxyXG4gICAgICAgICAgICAgICAgIHJlcy5qc29uKHtkcml2ZXJfaWQ6LTF9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHJpdmVyPXJlc3VsdC5yb3dzWzBdXHJcbiAgICAgICAgICAgICAgICBpZihkcml2ZXIuZHJpdmVyX3N0YXR1cz09XCJsb2dnZWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vbmUgZHJpdmVyIGlzIGFscmVhZHkgbG9nZ2VkXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe2RyaXZlcl9pZDotMn0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihkcml2ZXIuYWRtaW5fcGFzcz09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZG1pbiBzZXQgcGFzc3dvcmQgdG8gdGhpcyBkcml2ZXJcclxuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7ZHJpdmVyX2lkOi0zfSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICBlbHNleyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIucXVlcnkobG9naW4sW2RyaXZlci5kcml2ZXJfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7ZHJpdmVyX2lkOmRyaXZlci5kcml2ZXJfaWR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG5hcHAucG9zdCgnL2NyZWF0ZU5ld1Bhc3N3b3JkJywgKHJlcTphbnksIHJlczphbnksIG5leHQ6YW55KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN1Ym1pdHRpbmcgbmV3IHBhc3N3b3JkXCIpXHJcbiAgICAgICAgZGIucXVlcnkoY2hlY2tDcmVkZW50aWFscyxbcmVxLmJvZHkudXNlcm5hbWUsIHJlcS5ib2R5LnBhc3N3b3JkXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgXHJcbiAgICAgICAgICAgICAgICAgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNleyAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgaWYocmVzdWx0LnJvd3MubGVuZ3RoPT0wKXtcclxuICAgICAgICAgICAgICAgICAvL2NyZWRlbnRpYWxzIGFyZSBpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICAgcmVzLmpzb24oe3Jlc3BvbnNlOi0xfSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIGRyaXZlcj1yZXN1bHQucm93c1swXSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIucXVlcnkoY3JlYXRlTmV3UGFzc3dvcmQsW3JlcS5ib2R5Lm5ld3Bhc3N3b3JkLGRyaXZlci5kcml2ZXJfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZChcIkVycm9yXCIgKyBlcnIpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtyZXNwb25zZToxfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG4vL2xvZ2luZyBvdXQgZHJpdmVyLCB1cGR0aW5nIGRyaXZlciBzdGF0dXMgb24gZGF0YWJhc2VcclxuYXBwLnB1dCgnL2xvZ291dCcsIChyZXE6YW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJsb2dpbiBvdXRcIixyZXEuYm9keSlcclxuICAgICAgICBkYi5xdWVyeShsb2dvdXQsW3JlcS5ib2R5LmRyaXZlcl9pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgXHJcbiAgICAgICAgICAgICAgICAgcmVzLnNlbmQoXCJFcnJvclwiICsgZXJyKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGRiLnF1ZXJ5KGRpc2FjdGl2YXRlQnVzLFtyZXEuYm9keS5idXNfaWRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKFwiRXJyb3JcIiArIGVycik7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XCJzdWNjZXNzXCI6MX0pOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG59XHJcbiJdfQ==
