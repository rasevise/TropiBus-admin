"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
var createAdmin = 'INSERT INTO administrator(admin_first_name, admin_last_name, admin_username, admin_password) VALUES ($1,$2,$3,$4)';
var getAdmin = 'SELECT * FROM administrator WHERE admin_id=$1';
var getAdmins = 'SELECT * FROM administrator';
var updateAdmin = 'UPDATE administrator SET admin_first_name=$1, admin_last_name=$2, admin_email=$4 WHERE admin_id=$3';
var setPassword = 'UPDATE administrator SET admin_password=$1, admin_pass=$2 WHERE admin_id=$3';
var updatePassword = 'UPDATE administrator SET admin_password=$1, admin_pass=$2 WHERE admin_id=$3 AND admin_password=$4';
function register(app) {
    var admin;
    app.get('/register/getAdmin', function (req, res, next) {
        res.contentType('application/json');
        db.query(getAdmin, [req.query.id], function (err, result) {
            if (err) {
                console.error("Error: " + err);
                res.send(err);
            }
            else {
                res.json(result.rows[0]);
            }
        });
    });
    app.get('/register/getAdmins', function (req, res, next) {
        res.contentType('application/json');
        db.query(getAdmins, null, function (err, result) {
            if (err) {
                console.error("Error: " + err);
                res.send(err);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.post("/register", function (req, res) {
        db.query(createAdmin, [req.body.name, req.body.last, req.body.username, req.body.password], function (err, result) {
            if (err) {
                console.error("Error: " + err.code);
                res.send(err.code);
            }
            else {
                res.json(result);
            }
        });
    });
    app.put("/register/update", function (req, res) {
        db.query(updateAdmin, [req.body.name, req.body.last, req.body.id, req.body.email], function (err, result) {
            if (err) {
                console.error("Error: " + err);
                res.send(err.code);
            }
            else {
                res.json(result.rows);
            }
        });
    });
    app.put("/register/setPassword", function (req, res) {
        db.query(setPassword, [req.body.password, false, req.body.id], function (err, result) {
            if (err) {
                console.error("Error: " + err);
                res.send(err.code);
            }
            else {
                res.json(result);
            }
        });
    });
    app.put("/register/updatePassword", function (req, res) {
        db.query(updatePassword, [req.body.password, false, req.body.id, req.body.oldpassword], function (err, result) {
            if (err) {
                console.error("Error: " + err);
                res.send(err.code);
            }
            else {
                console.log(result);
                res.json(result);
            }
        });
    });
}
exports.register = register;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O1lBQ3JCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxVQUFDLEdBQU8sRUFBRSxHQUFPO1FBQ2pELEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsVUFBQyxHQUFPLEVBQUUsTUFBVTtZQUN2RyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUF6RUQsNEJBeUVDIiwiZmlsZSI6InNlcnZpY2VzL3JlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RiL3BnJztcblxudmFyIGNyZWF0ZUFkbWluID0gJ0lOU0VSVCBJTlRPIGFkbWluaXN0cmF0b3IoYWRtaW5fZmlyc3RfbmFtZSwgYWRtaW5fbGFzdF9uYW1lLCBhZG1pbl91c2VybmFtZSwgYWRtaW5fcGFzc3dvcmQpIFZBTFVFUyAoJDEsJDIsJDMsJDQpJztcbnZhciBnZXRBZG1pbj0gJ1NFTEVDVCAqIEZST00gYWRtaW5pc3RyYXRvciBXSEVSRSBhZG1pbl9pZD0kMSc7XG52YXIgZ2V0QWRtaW5zPSAnU0VMRUNUICogRlJPTSBhZG1pbmlzdHJhdG9yJztcbnZhciB1cGRhdGVBZG1pbiA9ICdVUERBVEUgYWRtaW5pc3RyYXRvciBTRVQgYWRtaW5fZmlyc3RfbmFtZT0kMSwgYWRtaW5fbGFzdF9uYW1lPSQyLCBhZG1pbl9lbWFpbD0kNCBXSEVSRSBhZG1pbl9pZD0kMyc7XG52YXIgc2V0UGFzc3dvcmQgPSAnVVBEQVRFIGFkbWluaXN0cmF0b3IgU0VUIGFkbWluX3Bhc3N3b3JkPSQxLCBhZG1pbl9wYXNzPSQyIFdIRVJFIGFkbWluX2lkPSQzJztcbnZhciB1cGRhdGVQYXNzd29yZCA9ICdVUERBVEUgYWRtaW5pc3RyYXRvciBTRVQgYWRtaW5fcGFzc3dvcmQ9JDEsIGFkbWluX3Bhc3M9JDIgV0hFUkUgYWRtaW5faWQ9JDMgQU5EIGFkbWluX3Bhc3N3b3JkPSQ0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xudmFyIGFkbWluO1xuXG5hcHAuZ2V0KCcvcmVnaXN0ZXIvZ2V0QWRtaW4nLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICByZXMuY29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBkYi5xdWVyeShnZXRBZG1pbiwgW3JlcS5xdWVyeS5pZF0sIChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoZXJyKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3NbMF0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuYXBwLmdldCgnL3JlZ2lzdGVyL2dldEFkbWlucycsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHJlcy5jb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGRiLnF1ZXJ5KGdldEFkbWlucywgbnVsbCwgKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBcIiArIGVycik7XG4gICAgICAgICAgICByZXMuc2VuZChlcnIpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQucm93cyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vL01ldGhvZCB0byB2YWxpZGF0ZSBMb2dpbiBpbmZvIHdpdGggZGJcbmFwcC5wb3N0KGAvcmVnaXN0ZXJgLCAocmVxOmFueSwgcmVzOmFueSkgPT4ge1xuICBkYi5xdWVyeShjcmVhdGVBZG1pbixbcmVxLmJvZHkubmFtZSwgcmVxLmJvZHkubGFzdCwgcmVxLmJvZHkudXNlcm5hbWUsIHJlcS5ib2R5LnBhc3N3b3JkXSAsKGVycjphbnksIHJlc3VsdDphbnkpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIgKyBlcnIuY29kZSk7XG4gICAgICAgIHJlcy5zZW5kKGVyci5jb2RlKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIHJlcy5qc29uKHJlc3VsdCk7XG4gICAgfVxuICAgIH0pO1xufSk7XG5cbmFwcC5wdXQoYC9yZWdpc3Rlci91cGRhdGVgLCAocmVxOmFueSwgcmVzOmFueSkgPT4ge1xuICAgIGRiLnF1ZXJ5KHVwZGF0ZUFkbWluLFtyZXEuYm9keS5uYW1lLCByZXEuYm9keS5sYXN0LCByZXEuYm9keS5pZCwgcmVxLmJvZHkuZW1haWxdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKXsgXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKGVyci5jb2RlKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmVzLmpzb24ocmVzdWx0LnJvd3MpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuYXBwLnB1dChgL3JlZ2lzdGVyL3NldFBhc3N3b3JkYCwgKHJlcTphbnksIHJlczphbnkpID0+IHtcbiAgICBkYi5xdWVyeShzZXRQYXNzd29yZCxbcmVxLmJvZHkucGFzc3dvcmQsIGZhbHNlLCByZXEuYm9keS5pZF0gLChlcnI6YW55LCByZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpeyBcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgcmVzLnNlbmQoZXJyLmNvZGUpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXMuanNvbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuYXBwLnB1dChgL3JlZ2lzdGVyL3VwZGF0ZVBhc3N3b3JkYCwgKHJlcTphbnksIHJlczphbnkpID0+IHtcbiAgICBkYi5xdWVyeSh1cGRhdGVQYXNzd29yZCxbcmVxLmJvZHkucGFzc3dvcmQsIGZhbHNlLCByZXEuYm9keS5pZCwgcmVxLmJvZHkub2xkcGFzc3dvcmRdICwoZXJyOmFueSwgcmVzdWx0OmFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKXsgXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiICsgZXJyKTsgXG4gICAgICAgICAgICByZXMuc2VuZChlcnIuY29kZSk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgIHJlcy5qc29uKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG59XG4iXX0=
