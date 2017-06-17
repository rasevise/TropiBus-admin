"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop NATURAL JOIN route WHERE route_id=$1 ORDER BY stop_order';
var createStop = 'INSERT INTO Stop(stop_name,stop_description,stop_latitude,stop_longitude) VALUES($1,$2,$3,$4) RETURNING stop_id';
var asignStopToRoute = 'INSERT INTO route_stop(route_id, stop_id) VALUES($1,$2)';
var deleteStop = 'DELETE FROM Stop WHERE stop_id=$1';
var updateStop = 'UPDATE stop SET stop_name=$1, stop_description=$2, stop_latitude=$3, stop_longitude=$4 WHERE stop_id=$3';
var updateStopOrder = 'UPDATE stop SET stop_order=$1 WHERE stop_id=$2';
function stops(app) {
    var _stopsURL = '/stops';
    app.get(_stopsURL + '/getStopsFromRoute', function (req, res, next) {
        db.query(getStopsFromRoute, [req.query.r_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.put(_stopsURL + '/updateStop', function (req, res, next) {
        var stop_name = req.body.stop_name;
        var stop_description = req.body.stop_description;
        var stop_latitude = req.body.stop_latitude;
        var stop_longitude = req.body.stop_longitude;
        var stop_id = req.body.s_id;
        db.query(updateStop, [stop_name, stop_description, stop_latitude, stop_longitude, stop_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error' + err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.put(_stopsURL + '/updateStopOrder', function (req, res, next) {
        var stops = req.body;
        console.log(stops);
        for (var i = 0; i < stops.length; i++) {
            db.query('UPDATE stop SET stop_order=$1 WHERE stop_id=$2', [i, stops[i].id], function (err, result) {
                if (err) {
                    console.error(err);
                    res.send('Error' + err);
                }
            });
        }
    });
    app.post(_stopsURL + '/createStop', function (req, res, next) {
        var stop_name = req.body.stop_name;
        var stop_description = req.body.stop_description;
        var stop_latitude = req.body.stop_latitude;
        var stop_longitude = req.body.stop_longitude;
        var routeID = req.body.r_id;
        db.query(createStop, [stop_name, stop_description, stop_latitude, stop_longitude], function (err, result) {
            var stopID = result.rows[0].stop_id;
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            db.query(asignStopToRoute, [routeID, stopID], function (err, result) {
                if (err) {
                    console.error(err);
                    res.send('Error ' + err);
                }
                else {
                    res.send(result);
                }
            });
        });
    });
    app.delete(_stopsURL + '/deleteStop', function (req, res, next) {
        var r_id = req.query.r_id;
        db.query(deleteStop, [req.query.stop_id], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error ' + err);
            }
            else {
                res.send(result);
            }
        });
    });
}
exports.stops = stops;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3N0b3BzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQStCO0FBRS9CLElBQUksaUJBQWlCLEdBQUcscUdBQXFHLENBQUM7QUFDOUgsSUFBSSxVQUFVLEdBQUcsaUhBQWlILENBQUM7QUFDbkksSUFBSSxnQkFBZ0IsR0FBRyx5REFBeUQsQ0FBQztBQUNqRixJQUFJLFVBQVUsR0FBRyxtQ0FBbUMsQ0FBQztBQUNyRCxJQUFJLFVBQVUsR0FBRyx5R0FBeUcsQ0FBQztBQUMzSCxJQUFJLGVBQWUsR0FBRyxnREFBZ0QsQ0FBQztBQUV2RSxlQUFzQixHQUF3QjtJQUM1QyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFPM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFHckQsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBQyxHQUFPLEVBQUUsTUFBVTtZQUM3RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUFBLElBQUksQ0FBQyxDQUFDO2dCQUNQLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsYUFBYSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzlDLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxFQUFHLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFDNUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFBQSxJQUFJLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGtCQUFrQixFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ25ELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxFQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRyxVQUFDLEdBQU8sRUFBRSxNQUFVO2dCQUM3RixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUMvQyxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUMsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQyxFQUFHLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFDbkcsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxVQUFDLEdBQU8sRUFBRSxNQUFVO2dCQUNsRSxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUFBLElBQUksQ0FBQyxDQUFDO29CQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7WUFDRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDakQsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDMUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFHLFVBQUMsR0FBTyxFQUFFLE1BQVU7WUFDMUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFBQSxJQUFJLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsQ0FBQztBQWxGRCxzQkFrRkMiLCJmaWxlIjoic2VydmljZXMvc3RvcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGIvcGcnO1xuXG52YXIgZ2V0U3RvcHNGcm9tUm91dGUgPSAnU0VMRUNUICogRlJPTSByb3V0ZV9zdG9wIE5BVFVSQUwgSk9JTiBzdG9wIE5BVFVSQUwgSk9JTiByb3V0ZSBXSEVSRSByb3V0ZV9pZD0kMSBPUkRFUiBCWSBzdG9wX29yZGVyJztcbnZhciBjcmVhdGVTdG9wID0gJ0lOU0VSVCBJTlRPIFN0b3Aoc3RvcF9uYW1lLHN0b3BfZGVzY3JpcHRpb24sc3RvcF9sYXRpdHVkZSxzdG9wX2xvbmdpdHVkZSkgVkFMVUVTKCQxLCQyLCQzLCQ0KSBSRVRVUk5JTkcgc3RvcF9pZCc7XG52YXIgYXNpZ25TdG9wVG9Sb3V0ZSA9ICdJTlNFUlQgSU5UTyByb3V0ZV9zdG9wKHJvdXRlX2lkLCBzdG9wX2lkKSBWQUxVRVMoJDEsJDIpJztcbnZhciBkZWxldGVTdG9wID0gJ0RFTEVURSBGUk9NIFN0b3AgV0hFUkUgc3RvcF9pZD0kMSc7XG52YXIgdXBkYXRlU3RvcCA9ICdVUERBVEUgc3RvcCBTRVQgc3RvcF9uYW1lPSQxLCBzdG9wX2Rlc2NyaXB0aW9uPSQyLCBzdG9wX2xhdGl0dWRlPSQzLCBzdG9wX2xvbmdpdHVkZT0kNCBXSEVSRSBzdG9wX2lkPSQzJztcbnZhciB1cGRhdGVTdG9wT3JkZXIgPSAnVVBEQVRFIHN0b3AgU0VUIHN0b3Bfb3JkZXI9JDEgV0hFUkUgc3RvcF9pZD0kMic7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wcyhhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgbGV0IF9zdG9wc1VSTCA9ICcvc3RvcHMnO1xuLy8gcm91dGVyLmdldCgnLycsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuLy8gICAgIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xuLy8gICAgIHZhciByb3V0ZXNKU09OID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdG9wcyk7XG4vLyAgICAgcmVzLmpzb24odGhpcy5zdG9wcyk7XG4vLyB9KTtcblxuYXBwLmdldChfc3RvcHNVUkwgKyAnL2dldFN0b3BzRnJvbVJvdXRlJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7Ly9QYXJhbWV0ZXI6IFJvdXRlIElEXG4gICAgLy8gY29uc29sZS5sb2coJ1ByaW50IGFsbCBTdG9wZiBmcm9tIGEgc3BlY2lmaWMgcm91dGUnKVxuICAgIC8vIGNvbnNvbGUubG9nKCdSb3V0ZSBJRDogJywgcmVxLnF1ZXJ5LnJfaWQpXG4gICAgZGIucXVlcnkoZ2V0U3RvcHNGcm9tUm91dGUsW3JlcS5xdWVyeS5yX2lkXSwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmFwcC5wdXQoX3N0b3BzVVJMICsgJy91cGRhdGVTdG9wJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdmFyIHN0b3BfbmFtZSA9IHJlcS5ib2R5LnN0b3BfbmFtZTtcbiAgICB2YXIgc3RvcF9kZXNjcmlwdGlvbiA9IHJlcS5ib2R5LnN0b3BfZGVzY3JpcHRpb247XG4gICAgdmFyIHN0b3BfbGF0aXR1ZGUgPSByZXEuYm9keS5zdG9wX2xhdGl0dWRlO1xuICAgIHZhciBzdG9wX2xvbmdpdHVkZSA9IHJlcS5ib2R5LnN0b3BfbG9uZ2l0dWRlO1xuICAgIHZhciBzdG9wX2lkID0gcmVxLmJvZHkuc19pZDtcbiAgICBkYi5xdWVyeSh1cGRhdGVTdG9wLFtzdG9wX25hbWUgLHN0b3BfZGVzY3JpcHRpb24sIHN0b3BfbGF0aXR1ZGUsIHN0b3BfbG9uZ2l0dWRlLCBzdG9wX2lkXSAsIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoJ0Vycm9yJyArIGVycik7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmFwcC5wdXQoX3N0b3BzVVJMICsgJy91cGRhdGVTdG9wT3JkZXInLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB2YXIgc3RvcHMgPSByZXEuYm9keTtcbiAgICBjb25zb2xlLmxvZyhzdG9wcyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYi5xdWVyeSgnVVBEQVRFIHN0b3AgU0VUIHN0b3Bfb3JkZXI9JDEgV0hFUkUgc3RvcF9pZD0kMicsW2ksIHN0b3BzW2ldLmlkXSAsIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZCgnRXJyb3InICsgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuYXBwLnBvc3QoX3N0b3BzVVJMICsgJy9jcmVhdGVTdG9wJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdmFyIHN0b3BfbmFtZSA9IHJlcS5ib2R5LnN0b3BfbmFtZTtcbiAgICB2YXIgc3RvcF9kZXNjcmlwdGlvbiA9IHJlcS5ib2R5LnN0b3BfZGVzY3JpcHRpb247XG4gICAgdmFyIHN0b3BfbGF0aXR1ZGUgPSByZXEuYm9keS5zdG9wX2xhdGl0dWRlO1xuICAgIHZhciBzdG9wX2xvbmdpdHVkZSA9IHJlcS5ib2R5LnN0b3BfbG9uZ2l0dWRlO1xuICAgIHZhciByb3V0ZUlEID0gcmVxLmJvZHkucl9pZDtcbiAgICBkYi5xdWVyeShjcmVhdGVTdG9wLFtzdG9wX25hbWUgLHN0b3BfZGVzY3JpcHRpb24sIHN0b3BfbGF0aXR1ZGUsIHN0b3BfbG9uZ2l0dWRlXSAsIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgIGxldCBzdG9wSUQgPSByZXN1bHQucm93c1swXS5zdG9wX2lkO1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZGIucXVlcnkoYXNpZ25TdG9wVG9Sb3V0ZSwgW3JvdXRlSUQsIHN0b3BJRF0sIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXMuc2VuZChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbmFwcC5kZWxldGUoX3N0b3BzVVJMICsgJy9kZWxldGVTdG9wJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdmFyIHJfaWQgPSByZXEucXVlcnkucl9pZDtcbiAgICBkYi5xdWVyeShkZWxldGVTdG9wLFtyZXEucXVlcnkuc3RvcF9pZF0gLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbn1cbiJdfQ==
