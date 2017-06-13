"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db/pg");
var jwt = require("jsonwebtoken");
var checkCredentials = 'SELECT admin_id FROM administrator WHERE admin_username=$1 and admin_password=$2';
function login(app) {
    var token = jwt.sign({ token: 'tropitoken' }, 'tropi');
    var admin;
    app.post("/login/authenticate", function (req, res) {
        console.log('inside server: ' + req.body.username);
        db.query(checkCredentials, [req.body.username, req.body.password], function (err, result) {
            if (err) {
                console.error(err);
                res.send('Error' + err);
            }
            else {
                if (result.rows.length === 0) {
                    res.status(400).send({
                        message: 'Incorrect Credentials'
                    });
                }
                else {
                    admin = result.rows[0];
                    res.json({ admin: admin, token: token });
                }
            }
        });
    });
}
exports.login = login;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQStCO0FBQy9CLGtDQUFvQztBQUVwQyxJQUFJLGdCQUFnQixHQUFFLGtGQUFrRixDQUFDO0FBRXpHLGVBQXNCLEdBQXdCO0lBRTlDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsSUFBSSxLQUFLLENBQUM7SUFFVixHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQUMsR0FBTyxFQUFFLEdBQU87UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVMsR0FBTyxFQUFFLE1BQVU7WUFDNUYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLE9BQU8sRUFBRSx1QkFBdUI7cUJBQ2pDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLElBQUksQ0FBQyxDQUFDO29CQUNILEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO1lBQ0wsQ0FBQztRQUNELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDO0FBeEJELHNCQXdCQyIsImZpbGUiOiJzZXJ2aWNlcy9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RiL3BnJztcclxuaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG52YXIgY2hlY2tDcmVkZW50aWFscz0gJ1NFTEVDVCBhZG1pbl9pZCBGUk9NIGFkbWluaXN0cmF0b3IgV0hFUkUgYWRtaW5fdXNlcm5hbWU9JDEgYW5kIGFkbWluX3Bhc3N3b3JkPSQyJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dpbihhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcclxuLy8gc2lnbiB3aXRoIGRlZmF1bHQgKEhNQUMgU0hBMjU2KVxyXG52YXIgdG9rZW4gPSBqd3Quc2lnbih7IHRva2VuOiAndHJvcGl0b2tlbid9LCAndHJvcGknKTtcclxudmFyIGFkbWluO1xyXG4vL01ldGhvZCB0byB2YWxpZGF0ZSBMb2dpbiBpbmZvIHdpdGggZGJcclxuYXBwLnBvc3QoYC9sb2dpbi9hdXRoZW50aWNhdGVgLCAocmVxOmFueSwgcmVzOmFueSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ2luc2lkZSBzZXJ2ZXI6ICcgKyByZXEuYm9keS51c2VybmFtZSk7XHJcbiAgZGIucXVlcnkoY2hlY2tDcmVkZW50aWFscyxbcmVxLmJvZHkudXNlcm5hbWUsIHJlcS5ib2R5LnBhc3N3b3JkXSAsZnVuY3Rpb24oZXJyOmFueSwgcmVzdWx0OmFueSkge1xyXG4gICAgaWYgKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICByZXMuc2VuZCgnRXJyb3InICsgZXJyKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICBpZihyZXN1bHQucm93cy5sZW5ndGg9PT0wKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuICAgICAgICAgICAgICBtZXNzYWdlOiAnSW5jb3JyZWN0IENyZWRlbnRpYWxzJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGFkbWluID0gcmVzdWx0LnJvd3NbMF07XHJcbiAgICAgICAgICAgIHJlcy5qc29uKHthZG1pbiwgdG9rZW59KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG59XHJcbiJdfQ==
