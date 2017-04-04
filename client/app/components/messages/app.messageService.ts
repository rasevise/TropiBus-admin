import { Injectable, Inject } from '@angular/core';
import {Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Message } from './messages';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MessageService {
  private _messagesURL = '/messages';
  private headers = new Headers({'Content-Type': 'application/json'});
  postResponse:any;
  constructor (@Inject(Http) private http: Http ) {}

 
    getMessages(): Observable<any[]> {
    return this.http.get(this._messagesURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }


    delete(id: number): Observable<Response> {
      const url = `${this._messagesURL}/${id}`;   
    return this.http.delete(url)
    .map(() => null);
  }

    create(message: any){
    return this.http
      .post('messages/addMessage', JSON.stringify({title: message.title,
         messageContent: message.messageContent}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }

    update(message: Message): Observable<Message> {
    const url = `${this._messagesURL}/${message.id}`;
    return this.http
      .put(url, JSON.stringify(message))
      .map(() => message)
      .catch(this.handleError);
    }
        private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  }

