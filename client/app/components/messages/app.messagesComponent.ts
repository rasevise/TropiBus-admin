
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './app.messageService'
import { Observable } from 'rxjs/rx';

@Component({
  selector: 'messages',
  templateUrl: './app/components/messages/messages.html',
  providers: [],

})
export class messagesComponent implements OnInit{
  message: Message = new Message(null,'', Date.now(), '');
  messages: Message[] = [];
  private myValue: number;
  timerSubscription: any;
  messageSubscription: any;

  constructor (@Inject(MessageService) private MessageService: MessageService, ){}

  setValue(val:number) {
      this.myValue = val;
  }
  getValue(){
    return this.myValue;
  }

  getMessages(): void{
    this.MessageService
        .getMessages()
        .catch(err =>  { 
          return Observable.throw(err); // observable needs to be returned or exception raised
        })
        .subscribe(
          messages => {this.messages = messages},
          err => console.error(err),
          () => console.log('get messages'));
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

  ngOnInit(): void {
    this.getMessages();
  }

  close(modalId: string){
    $('#'+ modalId).modal('hide')
  }


}





