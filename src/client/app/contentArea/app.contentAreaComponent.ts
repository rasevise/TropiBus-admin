import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from '../shared/messages/app.messageService';
import { Message } from '../messages/messages';
import { Observable } from 'rxjs/Rx';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RoutesComponent } from '../routepaths/routes.component';
import { Config } from '../shared/config/env.config';

@Component({
  moduleId: module.id,
<<<<<<< HEAD
  selector: 'contentarea',
=======
  selector: 'content-area',
>>>>>>> b43fd3f043c805e075d2e46b68e72515c72b5c71
  templateUrl: 'contentArea.html',
  providers: [ MessageService ]
})
export class ContentAreaComponent {
  message: Message = new Message(null,'', Date.now(), '');
  messages:any[];

  //calls child component
  @ViewChild(RoutesComponent) routecomponent: RoutesComponent;

  constructor (private MessageService: MessageService){}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.MessageService.getMessages()
    .subscribe((messages: any) => {
        this.messages = messages;
    });
  }

  public selectedMapTab(): void{
    console.log('selected map tab');
    // this.routecomponent.greyFix();
  }





}
