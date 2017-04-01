import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Bus} from './bus';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class busDriverService {
  private _busesURL = '/routesjson';
  private _driversURL = '/routesjson';
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
//     create(name: string): Promise<Bus> {
//   return this.http
//     .post(this._busesURL, JSON.stringify({name: name}))
//     .toPromise()
//     .then(res => res.json().data as Bus)
//     .catch(this.handleError);
// }

// delete(id: number): Promise<void> {
//     const url = `${this._busesURL}/${id}`;
//     return this.http.delete(url)
//       .toPromise()
//       .then(() => null)
//       .catch(this.handleError);
//   }
//     update(bus: Bus): Promise<Bus> {
//     const url = `${this._busesURL}/${bus.id}`;
//     return this.http
//       .put(url, JSON.stringify(bus))
//       .toPromise()
//       .then(() => bus)
//       .catch(this.handleError);
//   }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
 
}