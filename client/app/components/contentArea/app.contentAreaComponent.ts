import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from '../messages/app.messageService'
import { Message } from '../messages/messages';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RoutesComponent } from '../routepaths/routes.component';

@Component({
  selector: 'contentarea',
  templateUrl: './app/components/contentArea/contentArea.html',
  providers: [ MessageService ]
})
export class contentAreaComponent{
  message: Message = new Message(null,'', Date.now(), '');
  messages:any[];

  //calls child component
  @ViewChild(RoutesComponent) routecomponent: RoutesComponent;

  constructor (@Inject(MessageService) private MessageService: MessageService){}

   ngOnInit(): void {
    this.getMessages();
  }
  
  getMessages(): void{
    this.MessageService.getMessages()
    .subscribe((messages: any) => {
        this.messages = messages
    });
  }

  public selectedMapTab(): void{
    console.log("selected map tab");
    // this.routecomponent.greyFix();
  }



 
   
}
