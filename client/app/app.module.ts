import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from "@angular/forms";
import { AppComponent } from './app.component';
import { Ng2UtilsModule } from 'ng2-utils';
import { NgbModule }     from '@ng-bootstrap/ng-bootstrap';
import { busDriverService } from './components/busdriver/busdriver.service';
import { EqualValidator } from './directives/validator/equal-validator.directive';

import { headerComponent }      from './components/header/app.headerComponent';
import { contentAreaComponent } from './components/contentArea/app.contentAreaComponent';
import { footerComponent }      from './components/footer/app.footerComponent';
import { busdriverComponent }   from './components/busdriver/app.busdriverComponent';
import { messagesComponent }    from './components/messages/app.messagesComponent';
import { mapviewComponent }     from './components/mapview/app.mapviewComponent';
import { maprouteComponent }    from './components/maproute/app.maprouteComponent';
import { RoutesComponent }      from './routepaths/routes.component';
import { Ng2MapModule }         from 'ng2-map';
import { RoutesService }        from './routepaths/routes.service';
import { Routes }               from './routepaths/routes';

@NgModule({
  imports:      [ BrowserModule, 
                  HttpModule, 
                  FormsModule,
                  CommonModule,
                  ReactiveFormsModule,
                  NgbModule.forRoot(),
                  Ng2MapModule.forRoot({
                    apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCHzXlwzDfvO_W481qe-fr1mqH1iBLEd20'
                  }),
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
  providers: [ RoutesService, busDriverService ]
  
})

export class AppModule {}