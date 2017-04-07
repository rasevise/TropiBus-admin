
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './app.messageService'

@Component({
  selector: 'messages',
  templateUrl: './app/components/messages/messages.html',
  providers: [],

})
export class messagesComponent implements OnInit{
  message: Message = new Message(null,'', Date.now(), '');
  @Input() messages: Message[] = [];
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

  

  getMessages(): void{
    this.MessageService
        .getMessages()
        .subscribe(messages => this.messages = messages);
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





