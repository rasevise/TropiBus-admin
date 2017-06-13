"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buses_1 = require("./buses");
var login_1 = require("./login");
var routes_1 = require("./routes");
var stops_1 = require("./stops");
var drivers_1 = require("./drivers");
var messages_1 = require("./messages");
var register_1 = require("./register");
function init(app) {
    login_1.login(app);
    buses_1.buses(app);
    routes_1.routes(app);
    stops_1.stops(app);
    drivers_1.drivers(app);
    messages_1.messages(app);
    register_1.register(app);
}
exports.init = init;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsdUNBQXNDO0FBRXRDLGNBQXFCLEdBQXdCO0lBQ3pDLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixtQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsbUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBUkQsb0JBUUMiLCJmaWxlIjoic2VydmljZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBidXNlcyB9IGZyb20gJy4vYnVzZXMnO1xyXG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gJy4vbG9naW4nO1xyXG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcbmltcG9ydCB7IHN0b3BzIH0gZnJvbSAnLi9zdG9wcyc7XHJcbmltcG9ydCB7IGRyaXZlcnMgfSBmcm9tICcuL2RyaXZlcnMnO1xyXG5pbXBvcnQgeyBtZXNzYWdlcyB9IGZyb20gJy4vbWVzc2FnZXMnO1xyXG5pbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4vcmVnaXN0ZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7IFxyXG4gICAgbG9naW4oYXBwKTtcclxuICAgIGJ1c2VzKGFwcCk7XHJcbiAgICByb3V0ZXMoYXBwKTtcclxuICAgIHN0b3BzKGFwcCk7XHJcbiAgICBkcml2ZXJzKGFwcCk7XHJcbiAgICBtZXNzYWdlcyhhcHApO1xyXG4gICAgcmVnaXN0ZXIoYXBwKTtcclxufVxyXG4iXX0=
