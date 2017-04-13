
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './app.messageService'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'messages',
  templateUrl: './app/components/messages/messages.html',
  providers: [MessageService],

})
export class messagesComponent implements OnInit{
  message: Message = new Message(null,'', Date.now(), '');
  messages: any[] = [];
  private myValue: number;

  constructor (@Inject(MessageService) private service: MessageService, ){
  }

  ngOnInit(): void {
    this.getMessages();
  }

  setValue(val:number) {
      this.myValue = val;
  }
  getValue(){
    return this.myValue;
  }

  getMessages(): void{
    this.service.getMessages()
    .subscribe((messages: any) => {
        this.messages = messages
    });
  }


  add(): void {
    this.service.create(this.message, this.getValue());
    this.getMessages();
  }

  delete(i : number): void {
    this.service
        .delete(i);
        this.getMessages();
  }

  edit(message: any): void {
    this.service.update(message, this.getValue())
    this.getMessages();
  }



  close(modalId: string){
    $('#'+ modalId).modal('hide');
  }

  log(){
    console.log(this.messages.length);
  }


}





