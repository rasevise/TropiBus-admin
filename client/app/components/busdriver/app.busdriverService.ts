import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class BusDriverService {
  private _busesURL = '/buses';
  private _driversURL = '/drivers';
  constructor (@Inject(Http) private http: Http ) {}

  getBuses(): Observable<any[]> {
    return this.http.get(this._busesURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }

  getDrivers(): Observable<any[]> {
    return this.http.get(this._driversURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }
  
}