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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFFdEMsY0FBcUIsR0FBd0I7SUFDekMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLG1CQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQVBELG9CQU9DIiwiZmlsZSI6InNlcnZpY2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGJ1c2VzIH0gZnJvbSAnLi9idXNlcyc7XG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gJy4vbG9naW4nO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IHsgc3RvcHMgfSBmcm9tICcuL3N0b3BzJztcbmltcG9ydCB7IGRyaXZlcnMgfSBmcm9tICcuL2RyaXZlcnMnO1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL21lc3NhZ2VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7IFxuICAgIGxvZ2luKGFwcCk7XG4gICAgYnVzZXMoYXBwKTtcbiAgICByb3V0ZXMoYXBwKTtcbiAgICBzdG9wcyhhcHApO1xuICAgIGRyaXZlcnMoYXBwKTtcbiAgICBtZXNzYWdlcyhhcHApO1xufVxuIl19
