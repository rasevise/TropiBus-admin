"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buses_1 = require("./buses");
var login_1 = require("./login");
var routes_1 = require("./routes");
var stops_1 = require("./stops");
var drivers_1 = require("./drivers");
var messages_1 = require("./messages");
var register_1 = require("./register");
var bustrackingRoutes_1 = require("./bustrackingRoutes");
var timuserRoutes_1 = require("./timuserRoutes");
function init(app) {
    login_1.login(app);
    buses_1.buses(app);
    routes_1.routes(app);
    stops_1.stops(app);
    drivers_1.drivers(app);
    messages_1.messages(app);
    register_1.register(app);
    bustrackingRoutes_1.bustrack(app);
    timuserRoutes_1.userApp(app);
}
exports.init = init;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsdUNBQXNDO0FBQ3RDLHlEQUE4QztBQUM5QyxpREFBeUM7QUFFekMsY0FBcUIsR0FBd0I7SUFDekMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLG1CQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsNEJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLHVCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQVZELG9CQVVDIiwiZmlsZSI6InNlcnZpY2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGJ1c2VzIH0gZnJvbSAnLi9idXNlcyc7XG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gJy4vbG9naW4nO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IHsgc3RvcHMgfSBmcm9tICcuL3N0b3BzJztcbmltcG9ydCB7IGRyaXZlcnMgfSBmcm9tICcuL2RyaXZlcnMnO1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCB7IHJlZ2lzdGVyIH0gZnJvbSAnLi9yZWdpc3Rlcic7XG5pbXBvcnQgeyBidXN0cmFjayB9IGZyb20gJy4vYnVzdHJhY2tpbmdSb3V0ZXMnXG5pbXBvcnQgeyB1c2VyQXBwIH0gZnJvbSAnLi90aW11c2VyUm91dGVzJ1xuIFxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uKSB7IFxuICAgIGxvZ2luKGFwcCk7XG4gICAgYnVzZXMoYXBwKTtcbiAgICByb3V0ZXMoYXBwKTtcbiAgICBzdG9wcyhhcHApO1xuICAgIGRyaXZlcnMoYXBwKTtcbiAgICBtZXNzYWdlcyhhcHApO1xuICAgIHJlZ2lzdGVyKGFwcCk7XG4gICAgYnVzdHJhY2soYXBwKTtcbiAgICB1c2VyQXBwKGFwcCk7XG59XG4iXX0=
