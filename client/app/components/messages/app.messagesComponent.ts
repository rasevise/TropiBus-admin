
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



  constructor (@Inject(MessageService) private service: MessageService){
     service.getMessages()
    .subscribe(messages => this.messages = messages);
  }
    setValue(val:number) {
        this.myValue = val;
    }
    getValue(){
      return this.myValue;
    }

    getTempMessage(x: number){
      return this.messages[x];
    }

  addMessage(message: Message){
var temp_message= new Message();
    temp_message.title = message.title;
    temp_message.messageContent = message.messageContent;
    
    this.message.title="";
    this.message.messageContent="";
    this.messages.push(temp_message);
  }



    deleteMessage(i: any){
      this.messages.splice(i , 1);
  }
      editMessage(i: any, message:Message){
  
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





