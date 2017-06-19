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
var mailer_1 = require("./mailer");
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
    mailer_1.mailer(app);
}
exports.init = init;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsdUNBQXNDO0FBQ3RDLHlEQUE4QztBQUM5QyxpREFBeUM7QUFDekMsbUNBQWtDO0FBRWxDLGNBQXFCLEdBQXdCO0lBQ3pDLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixtQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsbUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLDRCQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsZUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFYRCxvQkFXQyIsImZpbGUiOiJzZXJ2aWNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBidXNlcyB9IGZyb20gJy4vYnVzZXMnO1xuaW1wb3J0IHsgbG9naW4gfSBmcm9tICcuL2xvZ2luJztcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCB7IHN0b3BzIH0gZnJvbSAnLi9zdG9wcyc7XG5pbXBvcnQgeyBkcml2ZXJzIH0gZnJvbSAnLi9kcml2ZXJzJztcbmltcG9ydCB7IG1lc3NhZ2VzIH0gZnJvbSAnLi9tZXNzYWdlcyc7XG5pbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4vcmVnaXN0ZXInO1xuaW1wb3J0IHsgYnVzdHJhY2sgfSBmcm9tICcuL2J1c3RyYWNraW5nUm91dGVzJ1xuaW1wb3J0IHsgdXNlckFwcCB9IGZyb20gJy4vdGltdXNlclJvdXRlcydcbmltcG9ydCB7IG1haWxlciB9IGZyb20gJy4vbWFpbGVyJztcbiBcbmV4cG9ydCBmdW5jdGlvbiBpbml0KGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikgeyBcbiAgICBsb2dpbihhcHApO1xuICAgIGJ1c2VzKGFwcCk7XG4gICAgcm91dGVzKGFwcCk7XG4gICAgc3RvcHMoYXBwKTtcbiAgICBkcml2ZXJzKGFwcCk7XG4gICAgbWVzc2FnZXMoYXBwKTtcbiAgICByZWdpc3RlcihhcHApO1xuICAgIGJ1c3RyYWNrKGFwcCk7XG4gICAgdXNlckFwcChhcHApO1xuICAgIG1haWxlcihhcHApO1xufVxuIl19
