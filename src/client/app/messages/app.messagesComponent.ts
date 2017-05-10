
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../shared/messages/app.messageService';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Component({
  moduleId: module.id,
  selector: 'messages',
  templateUrl: './messages.html',
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
    this.service
    .getMessages()
    .subscribe(messages => this.messages = messages);
  }


  add(): void {
    this.message.date = Date.now();
    this.service.create(this.message, this.messages.length).subscribe(() => {this.getMessages()});
  }

  delete(i : number): void {
    this.service
    .delete(this.messages[i].message_id)
    .subscribe(() => {this.getMessages()});
  }

  edit(message: any): void {
    this.service.update(this.message, this.messages[this.myValue].message_id)
    .subscribe(() => {this.getMessages()});
  }
  resetTemp(){
    this.message.title = "";
    this.message.messageContent = "";
  }
  setTemp(){
    this.message.title = this.messages[this.myValue].message_title;
    this.message.messageContent = this.messages[this.myValue].message_text;
  }

  confirmDeleteMessage(){
    var c = confirm("Are you sure you want to delete driver: ");
    if (c == true) {
        this.delete(this.myValue);
    }
  }


  close(modalId: string){
    $('#'+ modalId).modal('hide');
  }

  log(){
    console.log(this.messages.length);
  }
}







