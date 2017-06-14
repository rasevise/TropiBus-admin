"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
var getStopsFromRoute = 'SELECT * FROM route_stop NATURAL JOIN stop NATURAL JOIN route WHERE route_id=$1 ORDER BY stop_order';
var createStop = 'INSERT INTO Stop(stop_name,stop_description,stop_latitude,stop_longitude) VALUES($1,$2,$3,$4) RETURNING stop_id';
var asignStopToRoute = 'INSERT INTO route_stop(route_id, stop_id) VALUES($1,$2)';
var deleteStop = 'DELETE FROM Stop WHERE stop_id=$1';
var updateStop = 'UPDATE stop SET stop_name=$1, stop_description=$2 WHERE stop_id=$3';
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
        var stop_id = req.body.s_id;
        db.query(updateStop, [stop_name, stop_description, stop_id], function (err, result) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3N0b3BzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQStCO0FBRS9CLElBQUksaUJBQWlCLEdBQUcscUdBQXFHLENBQUM7QUFDOUgsSUFBSSxVQUFVLEdBQUcsaUhBQWlILENBQUM7QUFDbkksSUFBSSxnQkFBZ0IsR0FBRyx5REFBeUQsQ0FBQztBQUNqRixJQUFJLFVBQVUsR0FBRyxtQ0FBbUMsQ0FBQztBQUNyRCxJQUFJLFVBQVUsR0FBRyxvRUFBb0UsQ0FBQztBQUN0RixJQUFJLGVBQWUsR0FBRyxnREFBZ0QsQ0FBQztBQUV2RSxlQUFzQixHQUF3QjtJQUM1QyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFPM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFHckQsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBQyxHQUFPLEVBQUUsTUFBVTtZQUM3RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUFBLElBQUksQ0FBQyxDQUFDO2dCQUNQLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsYUFBYSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzlDLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsRUFBRyxVQUFDLEdBQU8sRUFBRSxNQUFVO1lBQzdFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNuRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsRUFBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUcsVUFBQyxHQUFPLEVBQUUsTUFBVTtnQkFDN0YsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDL0MsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pELElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsRUFBRyxVQUFDLEdBQU8sRUFBRSxNQUFVO1lBQ25HLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsVUFBQyxHQUFPLEVBQUUsTUFBVTtnQkFDbEUsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFBQSxJQUFJLENBQUMsQ0FBQztvQkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixDQUFDO1lBQ0QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsYUFBYSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ2pELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRyxVQUFDLEdBQU8sRUFBRSxNQUFVO1lBQzFELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUFoRkQsc0JBZ0ZDIiwiZmlsZSI6InNlcnZpY2VzL3N0b3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RiL3BnJztcblxudmFyIGdldFN0b3BzRnJvbVJvdXRlID0gJ1NFTEVDVCAqIEZST00gcm91dGVfc3RvcCBOQVRVUkFMIEpPSU4gc3RvcCBOQVRVUkFMIEpPSU4gcm91dGUgV0hFUkUgcm91dGVfaWQ9JDEgT1JERVIgQlkgc3RvcF9vcmRlcic7XG52YXIgY3JlYXRlU3RvcCA9ICdJTlNFUlQgSU5UTyBTdG9wKHN0b3BfbmFtZSxzdG9wX2Rlc2NyaXB0aW9uLHN0b3BfbGF0aXR1ZGUsc3RvcF9sb25naXR1ZGUpIFZBTFVFUygkMSwkMiwkMywkNCkgUkVUVVJOSU5HIHN0b3BfaWQnO1xudmFyIGFzaWduU3RvcFRvUm91dGUgPSAnSU5TRVJUIElOVE8gcm91dGVfc3RvcChyb3V0ZV9pZCwgc3RvcF9pZCkgVkFMVUVTKCQxLCQyKSc7XG52YXIgZGVsZXRlU3RvcCA9ICdERUxFVEUgRlJPTSBTdG9wIFdIRVJFIHN0b3BfaWQ9JDEnO1xudmFyIHVwZGF0ZVN0b3AgPSAnVVBEQVRFIHN0b3AgU0VUIHN0b3BfbmFtZT0kMSwgc3RvcF9kZXNjcmlwdGlvbj0kMiBXSEVSRSBzdG9wX2lkPSQzJztcbnZhciB1cGRhdGVTdG9wT3JkZXIgPSAnVVBEQVRFIHN0b3AgU0VUIHN0b3Bfb3JkZXI9JDEgV0hFUkUgc3RvcF9pZD0kMic7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wcyhhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgbGV0IF9zdG9wc1VSTCA9ICcvc3RvcHMnO1xuLy8gcm91dGVyLmdldCgnLycsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuLy8gICAgIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xuLy8gICAgIHZhciByb3V0ZXNKU09OID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdG9wcyk7XG4vLyAgICAgcmVzLmpzb24odGhpcy5zdG9wcyk7XG4vLyB9KTtcblxuYXBwLmdldChfc3RvcHNVUkwgKyAnL2dldFN0b3BzRnJvbVJvdXRlJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7Ly9QYXJhbWV0ZXI6IFJvdXRlIElEXG4gICAgLy8gY29uc29sZS5sb2coJ1ByaW50IGFsbCBTdG9wZiBmcm9tIGEgc3BlY2lmaWMgcm91dGUnKVxuICAgIC8vIGNvbnNvbGUubG9nKCdSb3V0ZSBJRDogJywgcmVxLnF1ZXJ5LnJfaWQpXG4gICAgZGIucXVlcnkoZ2V0U3RvcHNGcm9tUm91dGUsW3JlcS5xdWVyeS5yX2lkXSwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgIHJlcy5qc29uKHJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmFwcC5wdXQoX3N0b3BzVVJMICsgJy91cGRhdGVTdG9wJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdmFyIHN0b3BfbmFtZSA9IHJlcS5ib2R5LnN0b3BfbmFtZTtcbiAgICB2YXIgc3RvcF9kZXNjcmlwdGlvbiA9IHJlcS5ib2R5LnN0b3BfZGVzY3JpcHRpb247XG4gICAgdmFyIHN0b3BfaWQgPSByZXEuYm9keS5zX2lkO1xuICAgIGRiLnF1ZXJ5KHVwZGF0ZVN0b3AsW3N0b3BfbmFtZSAsc3RvcF9kZXNjcmlwdGlvbiwgc3RvcF9pZF0gLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IHJlcy5zZW5kKCdFcnJvcicgKyBlcnIpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5hcHAucHV0KF9zdG9wc1VSTCArICcvdXBkYXRlU3RvcE9yZGVyJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdmFyIHN0b3BzID0gcmVxLmJvZHk7XG4gICAgY29uc29sZS5sb2coc3RvcHMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGIucXVlcnkoJ1VQREFURSBzdG9wIFNFVCBzdG9wX29yZGVyPSQxIFdIRVJFIHN0b3BfaWQ9JDInLFtpLCBzdG9wc1tpXS5pZF0gLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgcmVzLnNlbmQoJ0Vycm9yJyArIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmFwcC5wb3N0KF9zdG9wc1VSTCArICcvY3JlYXRlU3RvcCcsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHZhciBzdG9wX25hbWUgPSByZXEuYm9keS5zdG9wX25hbWU7XG4gICAgdmFyIHN0b3BfZGVzY3JpcHRpb24gPSByZXEuYm9keS5zdG9wX2Rlc2NyaXB0aW9uO1xuICAgIHZhciBzdG9wX2xhdGl0dWRlID0gcmVxLmJvZHkuc3RvcF9sYXRpdHVkZTtcbiAgICB2YXIgc3RvcF9sb25naXR1ZGUgPSByZXEuYm9keS5zdG9wX2xvbmdpdHVkZTtcbiAgICB2YXIgcm91dGVJRCA9IHJlcS5ib2R5LnJfaWQ7XG4gICAgZGIucXVlcnkoY3JlYXRlU3RvcCxbc3RvcF9uYW1lICxzdG9wX2Rlc2NyaXB0aW9uLCBzdG9wX2xhdGl0dWRlLCBzdG9wX2xvbmdpdHVkZV0gLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICBsZXQgc3RvcElEID0gcmVzdWx0LnJvd3NbMF0uc3RvcF9pZDtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0Vycm9yICcgKyBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGRiLnF1ZXJ5KGFzaWduU3RvcFRvUm91dGUsIFtyb3V0ZUlELCBzdG9wSURdLCAoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdFcnJvciAnICsgZXJyKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG5hcHAuZGVsZXRlKF9zdG9wc1VSTCArICcvZGVsZXRlU3RvcCcsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHZhciByX2lkID0gcmVxLnF1ZXJ5LnJfaWQ7XG4gICAgZGIucXVlcnkoZGVsZXRlU3RvcCxbcmVxLnF1ZXJ5LnN0b3BfaWRdICwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyByZXMuc2VuZCgnRXJyb3IgJyArIGVycik7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG59XG4iXX0=
