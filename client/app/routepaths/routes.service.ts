import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Routes } from './routes';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RoutesService {
  private _routesURL = '/routesjson';
  constructor (@Inject(Http) private http: Http ) {}

  getPaths(): Observable<Routes[]> {
    return this.http.get(this._routesURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }
}