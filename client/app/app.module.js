"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var app_headerComponent_1 = require('./components/header/app.headerComponent');
var app_contentAreaComponent_1 = require('./components/contentArea/app.contentAreaComponent');
var app_footerComponent_1 = require('./components/footer/app.footerComponent');
var app_busdriverComponent_1 = require('./components/busdriver/app.busdriverComponent');
var app_messagesComponent_1 = require('./components/messages/app.messagesComponent');
var app_mapviewComponent_1 = require('./components/mapview/app.mapviewComponent');
var app_maprouteComponent_1 = require('./components/maproute/app.maprouteComponent');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [app_component_1.AppComponent,
                app_headerComponent_1.headerComponent,
                app_contentAreaComponent_1.contentAreaComponent,
                app_footerComponent_1.footerComponent,
                app_maprouteComponent_1.maprouteComponent,
                app_mapviewComponent_1.mapviewComponent,
                app_busdriverComponent_1.busdriverComponent,
                app_messagesComponent_1.messagesComponent,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map