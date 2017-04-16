import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from '../messages/app.messageService'
import { Message } from '../messages/messages';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'contentarea',
  templateUrl: './app/components/contentArea/contentArea.html',
  providers: [ MessageService ]
})
export class contentAreaComponent{
  message: Message = new Message(null,'', Date.now(), '');
  messages:any[];

  constructor (@Inject(MessageService) private MessageService: MessageService){
  }

   ngOnInit(): void {
    this.getMessages();
  }
  
  getMessages(): void{
    this.MessageService.getMessages()
    .subscribe((messages: any) => {
        this.messages = messages
    });
  }

 
   
}
