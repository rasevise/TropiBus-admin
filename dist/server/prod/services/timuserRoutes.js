"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
function userApp(app) {
    var _userURL = '/timuserRoutes';
    var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop WHERE route_id=$1 ORDER BY stop_order';
    var getBusLocation = 'SELECT gps_latitude, gps_longitude, bus_name,bus_status FROM bus NATURAL JOIN gps WHERE route_id=$1';
    var getMessages = 'SELECT * FROM message';
    var getAllRoutes = 'SELECT * FROM route NATURAL JOIN routepath ORDER BY route_area';
    var getRouteStatus = 'SELECT route_id, bus_status from route NATURAL JOIN bus WHERE bus_status<>\'Inactive\'';
    app.get(_userURL + '/getAllRoutes', function (req, res, next) {
        console.log("entre a cojer todas las rutas");
        db.query(getAllRoutes, null, function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            }
            else {
                db.query(getRouteStatus, null, function (err, result1) {
                    if (err) {
                        console.error(err);
                        res.send("Error " + err);
                    }
                    else {
                        console.log("coji el status de las rutas");
                        var results = result.rows;
                        var tempResults = result1.rows;
                        console.log("routes status result", tempResults);
                        if (tempResults.length == 0) {
                            for (var i = 0; i < results.length; i++) {
                                results[i].status = "Inactive";
                            }
                        }
                        else {
                            for (var i = 0; i < results.length; i++) {
                                var active = false;
                                for (var j = 0; j < tempResults.length; j++) {
                                    if (results[i].route_id == tempResults[j].route_id) {
                                        results[i].status = "Active";
                                        active = true;
                                        break;
                                    }
                                }
                                if (!active) {
                                    results[i].status = "Inactive";
                                }
                            }
                        }
                        res.json(results);
                    }
                });
            }
        });
    });
    app.get(_userURL + '/getStopsFromRoute', function (req, res, next) {
        console.log("cojer paradas de ruta especifica", req.query.route_id);
        db.query(getStopsFromRoute, [req.query.route_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.get(_userURL + '/getBusLocation', function (req, res, next) {
        console.log("buscando localizacion de bus", req.query.route_id);
        db.query(getBusLocation, [req.query.route_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.get(_userURL + '/getMessages', function (req, res, next) {
        console.log("getting messages");
        db.query(getMessages, null, function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
}
exports.userApp = userApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3RpbXVzZXJSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrQkEsNkJBQStCO0FBRS9CLGlCQUF3QixHQUF3QjtJQUtoRCxJQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsQyxJQUFJLGlCQUFpQixHQUFHLGtGQUFrRixDQUFBO0lBQzFHLElBQUksY0FBYyxHQUFHLHFHQUFxRyxDQUFBO0lBQzFILElBQUksV0FBVyxHQUFHLHVCQUF1QixDQUFBO0lBQ3pDLElBQUksWUFBWSxHQUFHLGdFQUFnRSxDQUFBO0lBQ25GLElBQUksY0FBYyxHQUFDLHdGQUF3RixDQUFBO0lBRzNHLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLGVBQWUsRUFBRSxVQUFDLEdBQU8sRUFBRSxHQUFPLEVBQUUsSUFBUTtRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFekMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFFN0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1AsQ0FBQztnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUEsQ0FBQztnQkFFTCxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsVUFBQyxHQUFPLEVBQUUsT0FBVztvQkFFaEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1IsQ0FBQzt3QkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQSxDQUFDO3dCQUNMLE9B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RSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFFOUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1AsQ0FBQztnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUEsQ0FBQztnQkFFTCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUdILEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLGNBQWMsRUFBRSxVQUFDLEdBQU8sRUFBRSxHQUFPLEVBQUUsSUFBUTtRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFHM0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFFNUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1AsQ0FBQztnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUEsQ0FBQztnQkFFTCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUFuSEQsMEJBbUhDIiwiZmlsZSI6InNlcnZpY2VzL3RpbXVzZXJSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogXHJcbiAqIEF1dGhvcjogTHVpcyBUb3JvXHJcbiAqIENyZWF0aW9uIERhdGU6IDMvMTgvMjAxN1xyXG4gKlxyXG4gKiBEZXNjcmlwdGlvbjogQ29udGFpbnMgQnVzIFRyYWNraW5nIGFwcCByb3V0ZXMgYW5kIHF1ZXJpZXMgXHJcbiAqIFxyXG4gKiBSb3V0ZXM6XHJcbiAqIFx0L2dldEFsbFJvdXRlc1xyXG4gKiAgL2dldFJvdXRlIFxyXG4gKiAgL2dldEFsbFN0b3BzIFxyXG4gKiAgL2dldE5lYXJlc3RTdG9wIFxyXG4gKiAgL2dldFN0b3BzRnJvbVJvdXRlIFxyXG4gKiAgL2dldEJ1c0xvY2F0aW9uIFxyXG4gKiAgL2dldE1lc3NhZ2VzIFxyXG4gKiAgL2dldEJ1c2VzIFxyXG4qKi9cclxuXHJcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RiL3BnJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VyQXBwKGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xyXG5cclxuLy9Sb3V0ZXMgcXVlcmllcyBkZWNsYXJhdGlvbiBcclxuXHJcblxyXG5jb25zdCBfdXNlclVSTCA9ICcvdGltdXNlclJvdXRlcyc7XHJcbnZhciBnZXRTdG9wc0Zyb21Sb3V0ZSA9ICdTRUxFQ1QgKiBGUk9NIHJvdXRlX3N0b3AgTkFUVVJBTCBKT0lOIHN0b3AgV0hFUkUgcm91dGVfaWQ9JDEgT1JERVIgQlkgc3RvcF9vcmRlcicgXHJcbnZhciBnZXRCdXNMb2NhdGlvbiA9ICdTRUxFQ1QgZ3BzX2xhdGl0dWRlLCBncHNfbG9uZ2l0dWRlLCBidXNfbmFtZSxidXNfc3RhdHVzIEZST00gYnVzIE5BVFVSQUwgSk9JTiBncHMgV0hFUkUgcm91dGVfaWQ9JDEnXHJcbnZhciBnZXRNZXNzYWdlcyA9ICdTRUxFQ1QgKiBGUk9NIG1lc3NhZ2UnXHJcbnZhciBnZXRBbGxSb3V0ZXMgPSAnU0VMRUNUICogRlJPTSByb3V0ZSBOQVRVUkFMIEpPSU4gcm91dGVwYXRoIE9SREVSIEJZIHJvdXRlX2FyZWEnXHJcbnZhciBnZXRSb3V0ZVN0YXR1cz0nU0VMRUNUIHJvdXRlX2lkLCBidXNfc3RhdHVzIGZyb20gcm91dGUgTkFUVVJBTCBKT0lOIGJ1cyBXSEVSRSBidXNfc3RhdHVzPD5cXCdJbmFjdGl2ZVxcJydcclxuXHJcbi8vZ2V0IGFsbCByb3V0ZXMgZnJvbSBkYXRhYmFzZSBhbmQgc2VuZCB0aGVtIGJhY2sgYXMgcmVzcG9uc2VcclxuYXBwLmdldChfdXNlclVSTCArICcvZ2V0QWxsUm91dGVzJywgKHJlcTphbnksIHJlczphbnksIG5leHQ6YW55KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcImVudHJlIGEgY29qZXIgdG9kYXMgbGFzIHJ1dGFzXCIpO1xyXG4gICAgICAgIC8vcnVuIHF1ZXJ5XHJcbiAgICAgICAgZGIucXVlcnkoZ2V0QWxsUm91dGVzLCBudWxsLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yIFwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy9ydW4gcXVlcnlcclxuICAgICAgICAgICAgZGIucXVlcnkoZ2V0Um91dGVTdGF0dXMsIG51bGwsIChlcnI6YW55LCByZXN1bHQxOmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoXCJFcnJvciBcIiArIGVycik7IH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvamkgZWwgc3RhdHVzIGRlIGxhcyBydXRhc1wiKVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHM9cmVzdWx0LnJvd3M7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFJlc3VsdHM9cmVzdWx0MS5yb3dzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb3V0ZXMgc3RhdHVzIHJlc3VsdFwiLHRlbXBSZXN1bHRzKVxyXG4gICAgICAgICAgICAgICAgLy9pZiBubyBidXNlcyBhcmUgYWN0aXZlIHNldCBzdGF0dXMgb2Ygcm91dGVzIHRvIGluYWN0aXZlXHJcbiAgICAgICAgICAgICAgICBpZih0ZW1wUmVzdWx0cy5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8cmVzdWx0cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpXS5zdGF0dXM9XCJJbmFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9zb21lIGJ1c2VzIGFyZSBhY3RpdmUgb24gc29tZSByb3V0ZVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPHJlc3VsdHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgYnVzIGhhcyBhbiBhY3RpdmUgb3IgY2hhbmdpbmcgZHJpdmVyIHN0YXR1cywgc2V0IHJvdXRlIHN0YXR1cyB0byBhY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0ZW1wUmVzdWx0cy5sZW5ndGg7aisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdHNbaV0ucm91dGVfaWQ9PXRlbXBSZXN1bHRzW2pdLnJvdXRlX2lkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzW2ldLnN0YXR1cz1cIkFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXRydWU7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGVyZSBpcyBubyBidXMgb24gc29tZSByb3V0ZSB3aXRoIGFjdGl2ZSBvciBjaGFuZ2luZyBkcml2ZXIgc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Fzc2lnbmVkIHJvdXRlIHN0YXR1cyB0byBpbmFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpXS5zdGF0dXM9XCJJbmFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9zZW5kaW5nIHJlc3VsdCBiYWNrIGFzIGpzb25cclxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8vZ2V0IGFsbCBidXMgc3RvcHMgZnJvbSBzcGVjaWZpYyByb3V0ZSBhbmQgc2VuZCBpbmZvIGJhY2sgYXMgcmVzcG9uc2VcclxuYXBwLmdldChfdXNlclVSTCArICcvZ2V0U3RvcHNGcm9tUm91dGUnLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHsvL1BhcmFtZXRlcjogUm91dGUgSURcclxuICAgIGNvbnNvbGUubG9nKFwiY29qZXIgcGFyYWRhcyBkZSBydXRhIGVzcGVjaWZpY2FcIixyZXEucXVlcnkucm91dGVfaWQpXHJcbiAgICAvL2Nvbm5ldGluZyB0byBkYXRhYmFzZVxyXG4gICAgICAgIC8vcnVubmluZyBxdWVyeVxyXG4gICAgICAgIGRiLnF1ZXJ5KGdldFN0b3BzRnJvbVJvdXRlLFtyZXEucXVlcnkucm91dGVfaWRdLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yIFwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvL3NlbmRpbmcgcmVzcG9uc2UgYmFjayBhcyAganNvblxyXG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG4vL2dldHRpbmcgYnVzIGxvY2F0aW9uIGZyb20gc3BlY2lmaWMgcm91dGVcclxuYXBwLmdldChfdXNlclVSTCArICcvZ2V0QnVzTG9jYXRpb24nLCAocmVxOmFueSwgcmVzOmFueSwgbmV4dDphbnkpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiYnVzY2FuZG8gbG9jYWxpemFjaW9uIGRlIGJ1c1wiLHJlcS5xdWVyeS5yb3V0ZV9pZClcclxuICAgIC8vY29ubmVjdGluZyB0byBkYXRhYmFzZVxyXG4gICAgICAgIC8vcnVubmlnIHF1ZXJ5XHJcbiAgICAgICAgZGIucXVlcnkoZ2V0QnVzTG9jYXRpb24sIFtyZXEucXVlcnkucm91dGVfaWRdLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgeyBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKFwiRXJyb3IgXCIgKyBlcnIpOyB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vc2VuZGluZyByZXN1bHQgYmFjayBhcyBqc29uXHJcbiAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcbi8vZ2V0dGluZyBtZXNzYWdlcyBwb3N0ZWQgYnkgYWRtaW5pc3RyYXRvclxyXG5hcHAuZ2V0KF91c2VyVVJMICsgJy9nZXRNZXNzYWdlcycsIChyZXE6YW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJnZXR0aW5nIG1lc3NhZ2VzXCIpXHJcbiAgICAvL2Nvbm5lY3RpbmcgdG8gZGF0YWJhc2VcclxuICAgICAgICAvL3J1biBxdWVyeVxyXG4gICAgICAgIGRiLnF1ZXJ5KGdldE1lc3NhZ2VzLCBudWxsLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgIHsgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZChcIkVycm9yIFwiICsgZXJyKTsgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvL3NlbmQgcmVzdWx0IGJhY2sgYXMganNvblxyXG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG59XHJcblxyXG4iXX0=