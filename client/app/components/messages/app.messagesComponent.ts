
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  user: FormGroup;
  temp_title : String = "";
  

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
    this.message.date = Date.now();
    this.service.create(this.message, this.messages.length);
    this.getMessages();
  }

  delete(i : number): void {
    this.service
    .delete(this.messages[i].message_id);
    this.getMessages();
  }

  edit(message: any): void {
    this.service.update(this.message, this.messages[this.myValue].message_id)
    this.getMessages();
  }
  resetTemp(){
    this.message.title = "";
    this.message.messageContent = "";
  }
  setTemp(){
    this.message.title = this.messages[this.myValue].message_title;
    this.message.messageContent = this.messages[this.myValue].message_text;
    console.log("edit value:" + this.temp_title)
  }


  close(modalId: string){
    $('#'+ modalId).modal('hide');
  }

  log(){
    console.log(this.messages.length);
  }
}







