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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsdUNBQXNDO0FBRXRDLGNBQXFCLEdBQXdCO0lBQ3pDLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixtQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsbUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBUkQsb0JBUUMiLCJmaWxlIjoic2VydmljZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgYnVzZXMgfSBmcm9tICcuL2J1c2VzJztcbmltcG9ydCB7IGxvZ2luIH0gZnJvbSAnLi9sb2dpbic7XG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgeyBzdG9wcyB9IGZyb20gJy4vc3RvcHMnO1xuaW1wb3J0IHsgZHJpdmVycyB9IGZyb20gJy4vZHJpdmVycyc7XG5pbXBvcnQgeyBtZXNzYWdlcyB9IGZyb20gJy4vbWVzc2FnZXMnO1xuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuL3JlZ2lzdGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7IFxuICAgIGxvZ2luKGFwcCk7XG4gICAgYnVzZXMoYXBwKTtcbiAgICByb3V0ZXMoYXBwKTtcbiAgICBzdG9wcyhhcHApO1xuICAgIGRyaXZlcnMoYXBwKTtcbiAgICBtZXNzYWdlcyhhcHApO1xuICAgIHJlZ2lzdGVyKGFwcCk7XG59XG4iXX0=
