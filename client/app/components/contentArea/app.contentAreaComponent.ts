import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from '../messages/app.messageService'
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'contentarea',
  templateUrl: './app/components/contentArea/contentArea.html',
  providers: [ MessageService ]
})
export class contentAreaComponent{

  // messages:any[];

  // constructor (@Inject(MessageService) private service: MessageService){
  //   MessageService.getMessages()
  //   .subscribe(messages => this.messages = messages);
  // }
}
