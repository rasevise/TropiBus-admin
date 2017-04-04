import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from "@angular/forms";
import { Ng2UtilsModule } from 'ng2-utils';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { EqualValidator } from './directives/validator/equal-validator.directive';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryMessageService }  from './components/messages/in-memory-message-service';

import { AppComponent } from './app.component';
import { headerComponent }      from './components/header/app.headerComponent';
import { contentAreaComponent } from './components/contentArea/app.contentAreaComponent';
import { footerComponent }      from './components/footer/app.footerComponent';
import { busdriverComponent }   from './components/busdriver/app.busdriverComponent';
import { messagesComponent }    from './components/messages/app.messagesComponent';
import { mapviewComponent }     from './components/mapview/app.mapviewComponent';
import { maprouteComponent }    from './components/maproute/app.maprouteComponent';
import { RoutesComponent }      from './components/routepaths/routes.component';
import { RoutesService }        from './components/routepaths/routes.service';
import { BusDriverService }     from './components/busdriver/app.busdriverService';
import { MessageService }     from './components/messages/app.messageService';
import { Routes }               from './components/routepaths/routes';

@NgModule({
  imports:      [ BrowserModule, 
                  HttpModule, 
                  FormsModule,
                  CommonModule,
                  ReactiveFormsModule,
                  ModalModule.forRoot(),
                  Ng2BootstrapModule.forRoot(),
                  Ng2UtilsModule,
                  ],
  declarations: [ AppComponent,
                  EqualValidator,
                  headerComponent, 
                  contentAreaComponent,
                  footerComponent,
                  maprouteComponent,
                  mapviewComponent,
                  busdriverComponent,
                  messagesComponent,
                  RoutesComponent
                  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  bootstrap:    [ AppComponent ],


  providers: [ RoutesService,
               BusDriverService,
               MessageService ]

  
})

export class AppModule {}