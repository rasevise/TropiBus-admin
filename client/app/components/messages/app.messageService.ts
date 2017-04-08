import { Injectable, Inject } from '@angular/core';
import {Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { Message } from './messages';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  private _messagesURL = '/messages';
  private headers = new Headers({'Content-Type': 'application/json'});
  postResponse:any;
  constructor (@Inject(Http) private http: Http ) {}

 
    getMessages(){
    return this.http.get(this._messagesURL)
    .map((res: Response) => res.json())
    .catch((error:any) => 'Server error');
  }


    delete(i: number){
    return this.http
    .delete('/messages/deleteMessage' + "/?index=" + i, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe((res:Response) => { this.postResponse = res; console.log(res); })
  }

    create(message: any){
    return this.http
      .post('/messages/addMessage', JSON.stringify({title: message.title,
         messageContent: message.messageContent}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
  }

    update(message: any, i: any){
    return this.http
      .put('/messages/updateMessage', JSON.stringify({title: message.title,
         messageContent: message.messageContent, index: i}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
    }
        private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  }

