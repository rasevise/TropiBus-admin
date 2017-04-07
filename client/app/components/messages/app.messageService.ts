import { Injectable, Inject } from '@angular/core';
import {Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
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
    .do(data => console.log('JSON length: ' + data.length));
  }


    delete(i: number){
    console.log('index: ' + i)
    return this.http
    .delete('/messages/deleteMessage' + "/?index=" + i, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
  }

    create(message: any){
    return this.http
      .post('/messages/addMessage', JSON.stringify({title: message.title,
         messageContent: message.messageContent}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }

    update(message: any, i: any){
      console.log("index: "+i);
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

