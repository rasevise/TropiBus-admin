import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from "@angular/forms";
import { AppComponent } from './app.component';
import { Ng2UtilsModule } from 'ng2-utils';
import { NgbModule }     from '@ng-bootstrap/ng-bootstrap';

import { headerComponent }      from './components/header/app.headerComponent';
import { contentAreaComponent } from './components/contentArea/app.contentAreaComponent';
import { footerComponent }      from './components/footer/app.footerComponent';
import { busdriverComponent }   from './components/busdriver/app.busdriverComponent';
import { messagesComponent }    from './components/messages/app.messagesComponent';
import { mapviewComponent }     from './components/mapview/app.mapviewComponent';
import { maprouteComponent }    from './components/maproute/app.maprouteComponent';
import { Ng2MapModule,  }      from 'ng2-map';

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
                  headerComponent, 
                  contentAreaComponent,
                  footerComponent,
                  maprouteComponent,
                  mapviewComponent,
                  busdriverComponent,
                  messagesComponent,
                  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }