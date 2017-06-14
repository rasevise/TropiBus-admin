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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsdUNBQXNDO0FBQ3RDLHlEQUE4QztBQUM5QyxpREFBeUM7QUFFekMsY0FBcUIsR0FBd0I7SUFDekMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLG1CQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsNEJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLHVCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQVZELG9CQVVDIiwiZmlsZSI6InNlcnZpY2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgYnVzZXMgfSBmcm9tICcuL2J1c2VzJztcclxuaW1wb3J0IHsgbG9naW4gfSBmcm9tICcuL2xvZ2luJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgeyBzdG9wcyB9IGZyb20gJy4vc3RvcHMnO1xyXG5pbXBvcnQgeyBkcml2ZXJzIH0gZnJvbSAnLi9kcml2ZXJzJztcclxuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL21lc3NhZ2VzJztcclxuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuL3JlZ2lzdGVyJztcclxuaW1wb3J0IHsgYnVzdHJhY2sgfSBmcm9tICcuL2J1c3RyYWNraW5nUm91dGVzJ1xyXG5pbXBvcnQgeyB1c2VyQXBwIH0gZnJvbSAnLi90aW11c2VyUm91dGVzJ1xyXG4gXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikgeyBcclxuICAgIGxvZ2luKGFwcCk7XHJcbiAgICBidXNlcyhhcHApO1xyXG4gICAgcm91dGVzKGFwcCk7XHJcbiAgICBzdG9wcyhhcHApO1xyXG4gICAgZHJpdmVycyhhcHApO1xyXG4gICAgbWVzc2FnZXMoYXBwKTtcclxuICAgIHJlZ2lzdGVyKGFwcCk7XHJcbiAgICBidXN0cmFjayhhcHApO1xyXG4gICAgdXNlckFwcChhcHApO1xyXG59XHJcbiJdfQ==
