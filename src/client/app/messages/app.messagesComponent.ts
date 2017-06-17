
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Message } from './messages';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../shared/messages/app.messageService';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Component({
  moduleId: module.id,
  selector: 'messages-component',
  templateUrl: './messages.html',
  providers: [MessageService],

})
export class MessagesComponent implements OnInit {
  message: Message = new Message(null, '', Date.now(), '');
  messages: any[] = [];
  alerts: any = [];
  private myValue: number;


  constructor( @Inject(MessageService) private service: MessageService, ) {
  }

  ngOnInit(): void {
    this.getMessages();
  }

  setValue(val: number) {
    this.myValue = val;
  }
  getValue() {
    return this.myValue;
  }

  getMessages(): void {
    this.service
      .getMessages()
      .subscribe(messages => this.messages = messages);
  }


  add(): void {
    this.message.date = Date.now();
    this.service.create(this.message, this.messages.length).subscribe(() => {
      this.getMessages();
      this.successAlert('Message Successfully Added');
    });
  }

  delete(): void {
    $('#confirm-deleteMessage').modal('hide')
    this.service
      .delete(this.messages[this.myValue].message_id)
      .subscribe(() => {
        this.getMessages();
        this.errorAlert('Message Deleted');
      });
  }

  edit(message: any): void {
    this.service.update(this.message, this.messages[this.myValue].message_id)
      .subscribe(() => {
        this.getMessages();
        this.successAlert('Message Successfully Updated');
      });
  }
  resetTemp() {
    this.message.title = '';
    this.message.messageContent = '';
  }
  setTemp() {
    this.message.title = this.messages[this.myValue].message_title;
    this.message.messageContent = this.messages[this.myValue].message_text;
  }

  confirmDeleteMessage() {
    $('#confirm-deleteMessage').modal('show')
  }

  successAlert(message: string): void {
    this.alerts.push({
      type: 'success',
      msg: message,
      timeout: 3000
    });
  }

  errorAlert(message: string): void {
    this.alerts.push({
      type: 'warning',
      msg: message,
      timeout: 3000
    });
  }


  close(modalId: string) {
    $('#' + modalId).modal('hide');
  }

  log() {
    console.log(this.messages.length);
  }
}







