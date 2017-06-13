import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule, ModalModule, AccordionModule, AlertModule, SortableModule } from 'ng2-bootstrap';
import { EqualValidator } from './directives/validator/equal-validator.directive';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthGuard }            from './guards/app.authGuard';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent }       from './login/app.loginComponent';
import { AppComponent }         from './app.component';
import { HeaderComponent }      from './header/app.headerComponent';
import { ContentAreaComponent } from './contentArea/app.contentAreaComponent';
import { FooterComponent }      from './footer/app.footerComponent';
import { BusDriverComponent }   from './busdriver/app.busdriverComponent';
import { MessagesComponent }    from './messages/app.messagesComponent';
import { RoutesComponent }      from './routepaths/routes.component';
import { RegisterComponent }    from './register/app.registerComponent';
import { ProfileComponent }     from './profile/profile.component';
import { Routes }               from './routepaths/routes';
import { routing }              from './app.routing';
import { SharedModule }         from './shared/shared.module';

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  FormsModule,
                  CommonModule,
                  ReactiveFormsModule,
                  ModalModule.forRoot(),
                  AccordionModule.forRoot(),
                  Ng2BootstrapModule.forRoot(),
                  AlertModule.forRoot(),
                  SortableModule.forRoot(),
                  SharedModule.forRoot(),
                  routing
                  ],
  declarations: [ AppComponent,
                  EqualValidator,
                  HeaderComponent,
                  ContentAreaComponent,
                  FooterComponent,
                  BusDriverComponent,
                  MessagesComponent,
                  RoutesComponent,
                  LoginComponent,
                  RegisterComponent,
                  ProfileComponent
                  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  bootstrap:    [ AppComponent ],


  providers: [{provide: APP_BASE_HREF,
                useValue: '<%= APP_BASE %>'},
              AuthGuard ]


})

export class AppModule {}
