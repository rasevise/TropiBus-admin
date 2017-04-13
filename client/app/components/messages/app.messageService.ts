import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Message } from './messages';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessageService {
  private _messagesURL = '/messages';
  private headers = new Headers({'Content-Type': 'application/json'});
  postResponse:any;


  constructor (@Inject(Http) private http: Http ) {}
 
  getMessages(){
    return this.http.get(this._messagesURL)
    .map((res: Response) => res.json())
  }

    delete(i: number){
      console.log("delete i :" + i);
    return this.http
    .delete('/messages/deleteMessage' + "/?id=" + i, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe((res:Response) => { this.postResponse = res; console.log(res); })
  }
    create(message: any, index: number){
    return this.http
      .post('/messages/addMessage', JSON.stringify({id: index, title: message.title,
         messageContent: message.messageContent}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
  }

    update(message: any, i: any){
    return this.http
      .put('/messages/updateMessage', JSON.stringify({title: message.title,
         messageContent: message.messageContent, index: i, date: message.date}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
    }
    
  // private handleError(error: any){ 
  //   // In a real world app, you might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
  
  }

