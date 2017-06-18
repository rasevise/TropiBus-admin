"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
var getAllRoutes = 'SELECT * FROM Route NATURAL JOIN routepath';
var getRoute = 'SELECT * FROM route NATURAL JOIN routepath WHERE route_id = $1';
var updateRoute = 'UPDATE Route SET route_name=$1, route_description=$2 WHERE route_id=$3';
var getBusLocation = 'SELECT gps_latitude, gps_longitude, bus_name, bus_status, route_name FROM bus NATURAL JOIN gps NATURAL JOIN route WHERE bus_status=\'Active\'';
var countDriver = 'SELECT COUNT(*) FROM driver WHERE driver_status=\'logged\'';
var countBus = 'SELECT COUNT(*) FROM bus WHERE bus_status=\'Active\'';
function routes(app) {
    var _routesURL = '/routes';
    app.get(_routesURL, function (req, res, next) {
        console.log('inside routes get');
        res.contentType('application/json');
        db.query(getAllRoutes, null, function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.get(_routesURL + '/countDriver', function (req, res, next) {
        console.log('inside routes get');
        res.contentType('application/json');
        db.query(countDriver, null, function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.json(result.rows[0].count);
            }
        });
    });
    app.get(_routesURL + '/countBus', function (req, res, next) {
        console.log('inside routes get');
        res.contentType('application/json');
        db.query(countBus, null, function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.json(result.rows[0].count);
            }
        });
    });
    app.get(_routesURL + '/getRoute', function (req, res, next) {
        res.contentType('application/json');
        db.query(getRoute, [req.query.r_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.put(_routesURL + '/updateRoute', function (req, res, next) {
        db.query(updateRoute, [req.body.route_name, req.body.route_description, req.body.route_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                db.query(getAllRoutes, null, function (err, result) {
                    if (err) {
                        console.error(err);
                        res.send('Error ' + err);
                    }
                    else {
                        res.json(result.rows);
                    }
                });
            }
        });
    });
    app.get(_routesURL + '/getBusLocation', function (req, res, next) {
        res.contentType('application/json');
        db.query(getBusLocation, null, function (err, result) {
            if (err) {
                res.send('Error ' + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
}
exports.routes = routes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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L0MsQ0FBQztZQUFBLElBQUksQ0FBQyxDQUFDO2dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxVQUFDLEdBQU8sRUFBRSxNQUFVO29CQUMvQyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQy9DLENBQUM7b0JBQUEsSUFBSSxDQUFDLENBQUM7d0JBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hCLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLGlCQUFpQixFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ3JELEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsVUFBQyxHQUFPLEVBQUUsTUFBVTtZQUNqRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFBQSxJQUFJLENBQUMsQ0FBQztnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUE3RUQsd0JBNkVDIiwiZmlsZSI6InNlcnZpY2VzL3JvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RiL3BnJztcclxuXHJcbnZhciBnZXRBbGxSb3V0ZXMgPSAnU0VMRUNUICogRlJPTSBSb3V0ZSBOQVRVUkFMIEpPSU4gcm91dGVwYXRoJztcclxudmFyIGdldFJvdXRlID0gJ1NFTEVDVCAqIEZST00gcm91dGUgTkFUVVJBTCBKT0lOIHJvdXRlcGF0aCBXSEVSRSByb3V0ZV9pZCA9ICQxJztcclxudmFyIHVwZGF0ZVJvdXRlID0gJ1VQREFURSBSb3V0ZSBTRVQgcm91dGVfbmFtZT0kMSwgcm91dGVfZGVzY3JpcHRpb249JDIgV0hFUkUgcm91dGVfaWQ9JDMnO1xyXG52YXIgZ2V0QnVzTG9jYXRpb24gPSAnU0VMRUNUIGdwc19sYXRpdHVkZSwgZ3BzX2xvbmdpdHVkZSwgYnVzX25hbWUsIGJ1c19zdGF0dXMsIHJvdXRlX25hbWUgRlJPTSBidXMgTkFUVVJBTCBKT0lOIGdwcyBOQVRVUkFMIEpPSU4gcm91dGUgV0hFUkUgYnVzX3N0YXR1cz1cXCdBY3RpdmVcXCcnO1xyXG52YXIgY291bnREcml2ZXIgPSAnU0VMRUNUIENPVU5UKCopIEZST00gZHJpdmVyIFdIRVJFIGRyaXZlcl9zdGF0dXM9XFwnbG9nZ2VkXFwnJztcclxudmFyIGNvdW50QnVzID0gJ1NFTEVDVCBDT1VOVCgqKSBGUk9NIGJ1cyBXSEVSRSBidXNfc3RhdHVzPVxcJ0FjdGl2ZVxcJyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm91dGVzKGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xyXG5cclxubGV0IF9yb3V0ZXNVUkwgPSAnL3JvdXRlcyc7XHJcbmFwcC5nZXQoX3JvdXRlc1VSTCwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zaWRlIHJvdXRlcyBnZXQnKTtcclxuICAgIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgZGIucXVlcnkoZ2V0QWxsUm91dGVzLCBudWxsLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmFwcC5nZXQoX3JvdXRlc1VSTCArICcvY291bnREcml2ZXInLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgcm91dGVzIGdldCcpO1xyXG4gICAgcmVzLmNvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICBkYi5xdWVyeShjb3VudERyaXZlciwgbnVsbCwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3NbMF0uY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5hcHAuZ2V0KF9yb3V0ZXNVUkwgKyAnL2NvdW50QnVzJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zaWRlIHJvdXRlcyBnZXQnKTtcclxuICAgIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgZGIucXVlcnkoY291bnRCdXMsIG51bGwsIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzWzBdLmNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmdldChfcm91dGVzVVJMICsgJy9nZXRSb3V0ZScsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xyXG4gIGRiLnF1ZXJ5KGdldFJvdXRlLCBbcmVxLnF1ZXJ5LnJfaWRdLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xyXG4gICAgaWYgKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3MpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmFwcC5wdXQoX3JvdXRlc1VSTCArICcvdXBkYXRlUm91dGUnLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICBkYi5xdWVyeSh1cGRhdGVSb3V0ZSxbcmVxLmJvZHkucm91dGVfbmFtZSwgcmVxLmJvZHkucm91dGVfZGVzY3JpcHRpb24sIHJlcS5ib2R5LnJvdXRlX2lkXSwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuICAgIGlmIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgIGRiLnF1ZXJ5KGdldEFsbFJvdXRlcywgbnVsbCwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmFwcC5nZXQoX3JvdXRlc1VSTCArICcvZ2V0QnVzTG9jYXRpb24nLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICByZXMuY29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICBkYi5xdWVyeShnZXRCdXNMb2NhdGlvbiwgbnVsbCwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcclxuICAgIGlmIChlcnIpIHtcclxuICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxufVxyXG4iXX0=
