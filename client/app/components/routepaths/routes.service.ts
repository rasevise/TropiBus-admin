import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Routes } from './routes';



import { Stops } from './stops';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RoutesService {
  
  private _routesURL = '/routesjson';
  private _stopsURL = '/stopsjson';

  constructor (@Inject(Http) private http: Http ) {}

  getPaths(): Observable<Routes[]> {
    return this.http.get(this._routesURL)
    .map((res: Response) => res.json());
  }

  getStops(): Observable<Stops[]> {
    return this.http.get(this._stopsURL)
    .map((res: Response) => res.json());
  }

}