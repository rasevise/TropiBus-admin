import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from '../shared/messages/app.messageService';
import { RoutesService } from '../shared/routepaths/routes.service';
import { Message } from '../messages/messages';
import { Observable } from 'rxjs/Rx';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RoutesComponent } from '../routepaths/routes.component';
import { Config } from '../shared/config/env.config';

@Component({
  moduleId: module.id,
  selector: 'content-area',
  templateUrl: 'contentArea.html',
  providers: [ MessageService ]
})
export class ContentAreaComponent{
  message: Message = new Message(null,'', null, '');
  messages:any[];
  recentMessages: any[];
  countDriver:any;
  countBus:any;

  //calls child component
  // @ViewChild(RoutesComponent) routecomponent: RoutesComponent;

  constructor (private MessageService: MessageService, private RoutesService: RoutesService){}



  ngOnInit(): void {
    this.getMessages();
    this.getCounts(this);
  }

  getCounts(that:any){
    setInterval(function(){
      that.getBusCount();
      that.getDriverCount();
      that.getMessages();
    }, 4000);
  }

  getMessages(): void {
    this.MessageService.getMessages()
    .subscribe((messages: any) => {
        this.messages = messages;
    });
  }

  getBusCount(): void {
    this.RoutesService.getCountBus()
    .subscribe((countBus: any) => {
        this.countBus = countBus;
    });
  }
  getDriverCount(): void {
    this.RoutesService.getCountDriver()
    .subscribe((countDriver: any) => {
        this.countDriver = countDriver;
    });
  }
  // public selectedMapTab(): void{
  //   console.log('selected map tab');
  //   this.routecomponent.loadMap();
  // }

  // getRecentMessages(): void{
  //   console.log("hello")
  //   this.getMessages();
  //   var date = new Date();
  //   var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  //   var y: number = 0;
  //   for(var x: number = 0; x < this.messages.length; x++){
  //     var exp = new Date(this.messages[x].message_date.getFullYear(), this.messages[x].message_date.getMonth(), this.messages[x].message_date.getDate());
  //     console.log("EXPDate" + exp.getTime())
  //     if(exp.getTime() < today.getTime()){
  //       this.recentMessages[y] = this.messages[x];
  //       y++;
  //     }
  //   }

  // }






}
