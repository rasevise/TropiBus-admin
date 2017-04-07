
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './app.messageService'

@Component({
  selector: 'messages',
  templateUrl: './app/components/messages/messages.html',
  providers: [],

})
export class messagesComponent  {
  message: Message = new Message();
  messages: any[] = [];
  private myValue: number;





  constructor (@Inject(MessageService) private MessageService: MessageService, ){
     MessageService.getMessages()
    .subscribe(messages => this.messages = messages);
  }

 

  setValue(val:number) {
      this.myValue = val;
  }
  getValue(){
    return this.myValue;
  }

  

  getMessages(): void {
    this.MessageService
        .getMessages()
        .subscribe(messages => this.messages = messages);
  }


  add(message: Message): void {
    this.MessageService.create(message);
    this.getMessages();
  }

  delete(i : number): void {
    console.log("index: "  + i);
    this.MessageService
        .delete(i);
        this.getMessages();
  }

  edit(i: number): void {
    this.MessageService.update(this.message, i)
    this.getMessages();
  }

  ngOnInit(): void {
    this.getMessages();
  }
    

    getTempMessage(x: number){
      return this.messages[x];
    }

  close(modalId: string){
    $('#'+ modalId).modal('hide')
  }


}





