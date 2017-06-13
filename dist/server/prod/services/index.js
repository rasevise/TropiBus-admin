"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buses_1 = require("./buses");
var login_1 = require("./login");
var routes_1 = require("./routes");
var stops_1 = require("./stops");
var drivers_1 = require("./drivers");
var messages_1 = require("./messages");
function init(app) {
    login_1.login(app);
    buses_1.buses(app);
    routes_1.routes(app);
    stops_1.stops(app);
    drivers_1.drivers(app);
    messages_1.messages(app);
}
exports.init = init;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFFdEMsY0FBcUIsR0FBd0I7SUFDekMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLG1CQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQVBELG9CQU9DIiwiZmlsZSI6InNlcnZpY2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgYnVzZXMgfSBmcm9tICcuL2J1c2VzJztcclxuaW1wb3J0IHsgbG9naW4gfSBmcm9tICcuL2xvZ2luJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgeyBzdG9wcyB9IGZyb20gJy4vc3RvcHMnO1xyXG5pbXBvcnQgeyBkcml2ZXJzIH0gZnJvbSAnLi9kcml2ZXJzJztcclxuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL21lc3NhZ2VzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikgeyBcclxuICAgIGxvZ2luKGFwcCk7XHJcbiAgICBidXNlcyhhcHApO1xyXG4gICAgcm91dGVzKGFwcCk7XHJcbiAgICBzdG9wcyhhcHApO1xyXG4gICAgZHJpdmVycyhhcHApO1xyXG4gICAgbWVzc2FnZXMoYXBwKTtcclxufVxyXG4iXX0=
