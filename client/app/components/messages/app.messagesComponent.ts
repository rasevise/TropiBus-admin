
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './app.messageService'
import { Observable } from 'rxjs';

@Component({
  selector: 'messages',
  templateUrl: './app/components/messages/messages.html',
  providers: [],

})
export class messagesComponent implements OnInit{
  message: Message = new Message(null,'', Date.now(), '');
  messages: Array<Message> = [];
  private myValue: number;
  timerSubscription: any;
  messageSubscription: any;

  constructor (@Inject(MessageService) private MessageService: MessageService, ){
  }

  ngOnInit(): void {
    this.MessageService.messages
    .subscribe((messages: Array<Message>) => {
        this.messages = messages
    });
    this.getMessages();
  }

  setValue(val:number) {
      this.myValue = val;
  }
  getValue(){
    return this.myValue;
  }

  getMessages(): void{
    this.MessageService
        .getMessages();
  }


  add(): void {
    this.MessageService.create(this.message);
    this.getMessages();
  }

  delete(i : number): void {
    this.MessageService
        .delete(i);
        this.getMessages();
  }

  edit(message: any): void {
    this.MessageService.update(message, this.getValue())
    this.getMessages();
  }



  close(modalId: string){
    $('#'+ modalId).modal('hide')
  }


}





