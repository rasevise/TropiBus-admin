import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Message } from '../../messages/messages';
import { Observable } from 'rxjs/Rx';
import { Config } from '../config/env.config';

@Injectable()
export class MessageService {
  postResponse:any;
  private _messagesURL = '/messages';
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor (private http: Http ) {}

  getMessages(): Observable<any[]> {
    return this.http.get(`${Config.API}/messages`, { headers:this.headers })
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  // getRecentMessages(): Observable<any[]> {
  //   return this.http.get(`${Config.API}/recentMessages`, { headers:this.headers })
  //   .map((res: Response) => res.json())
  //   .catch(this.handleError);
  // }

    delete(i: number){
      console.log('delete i :' + i);
    return this.http
    .delete(`${Config.API}/messages/deleteMessage` + '/?id=' + i, { headers:this.headers })
    .map((res: Response) => res.json())
  }
    create(message: any, index: number): Observable<any[]>{
    return this.http
      .post(`${Config.API}/messages/addMessage`, JSON.stringify({id: index, title: message.title,
         messageContent: message.messageContent}), { headers:this.headers })
      .map((res: Response) => res.json().data)
  }

    update(message: any, id: number): Observable<any[]>{
    return this.http
      .put(`${Config.API}/messages/updateMessage`, JSON.stringify({title: message.title,
         messageContent: message.messageContent, id: id, date: message.date}), { headers:this.headers })
      .map((res: Response) => res.json().data)
    }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  }

