
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Message } from './messages';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './app.messageService'

@Component({
  selector: 'messages',
  templateUrl: './app/components/messages/messages.html',
  providers: [NgbModal],
})
export class messagesComponent  {
  message: Message = new Message();
  messages: any[] = [];
  submitted = false;

onSubmit() { this.submitted = true; }

  constructor (@Inject(MessageService) private service: MessageService){
     service.getMessages()
    .subscribe(messages => this.messages = messages);
  }

  addMessage(message: Message){
    this.messages.push(message);
  }

    deleteMessage(i: any){
      this.messages.splice(i , 1);
  }
      editMessage(i: any){
      return this.messages;
  }


}




