import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MessageService {
  private _messagesURL = '/messages';

  constructor (@Inject(Http) private http: Http ) {}

 
    getMessages(): Observable<any[]> {
    return this.http.get(this._messagesURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }

