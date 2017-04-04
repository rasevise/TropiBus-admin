
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

  

  //   getMessages(): void {
  //   this.MessageService
  //       .getMessages()
  //       .subscribe(messages => this.messages = messages);
  // }


  // add(message: Message): void {
  //   this.MessageService.create(message);
  //   this.getMessages();
  // }

  // delete(i : number): void {
  //   this.MessageService
  //       .delete(i);
  //       this.getMessages();
  // }

  // save(): void {
  //   this.MessageService.update(this.message, this.getValue())
  //   this.getMessages();
  // }

  // ngOnInit(): void {
  //   this.getMessages();
  // }
    

    getTempMessage(x: number){
      return this.messages[x];
    }

  
  addMessage(message: Message){
var temp_message= new Message();
    temp_message.title = message.title;
    temp_message.messageContent = message.messageContent;
    temp_message.date = Date.now();
   // x: number =  new Date.now();

    this.message.title="";
    this.message.messageContent="";
    this.message.date = 0;
    this.messages.push(temp_message);
  }



  deleteMessage(i: any){
      this.messages.splice(i , 1);
  }
      editMessage( message:Message){
  
var temp_message= new Message();
    temp_message.id = message.id;
    temp_message.title = message.title;
    temp_message.messageContent = message.messageContent;
    console.log(this.getTempMessage(this.myValue).title);
  
    this.message.title="";
    this.message.messageContent="";

      this.messages.splice(this.myValue, 1);
      this.messages.splice(this.myValue, 0, temp_message)  
      
      
  }
  close(modalId: string){
    $('#'+ modalId).modal('hide')
  }


}





