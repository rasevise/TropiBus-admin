import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Driver, Bus } from '../../busdriver/busdriver';
import { Config } from '../config/env.config';

@Injectable()
export class BusDriverService {

  postResponse:any;
  private _busesURL = '/buses';
  private _driversURL = '/drivers';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private http: Http ) {}

  //Buses//
  getBuses(): Observable<any[]> {
    return this.http.get(`${Config.API}`+ this._busesURL)
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  deleteBus(id: number){
    return this.http
    .delete(`${Config.API}`+ this._busesURL + '/deleteBus' + '/?id=' + id, { headers: this.headers })
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  createBus(bus: any) {
    return this.http
      .post(`${Config.API}`+ this._busesURL + '/addBus', JSON.stringify({name: bus.name, routeid: bus.route, driverid: bus.driver, status: bus.status}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .catch(this.handleError);
  }

  updateBus(bus: any, id: number, buses:any) {
    return this.http
    .put(`${Config.API}`+ this._busesURL + '/updateBus', JSON.stringify({name: bus.name, id: id, routeid: bus.route, driverid: bus.driver, status: bus.status, olddriverid: buses.driver_id}), { headers:this.headers })
    .map((res: Response) => res.json().data)
    .catch(this.handleError);
  }

  //Drivers//
  getDrivers(): Observable<any[]> {
    return this.http.get(`${Config.API}`+ this._driversURL)
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  deleteDriver(id: number){
    return this.http
    .delete(`${Config.API}`+ this._driversURL + '/deleteDriver' + '/?id=' + id, { headers:this.headers })
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  createDriver(driver: any) {
    return this.http
      .post(`${Config.API}`+ this._driversURL + '/addDriver', JSON.stringify({name: driver.name,
         lastName: driver.lastName, username : driver.username, password: driver.password}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .catch(this.handleError);
  }

  updateDriver(driver: any, id: any) {
    return this.http
    .put(`${Config.API}`+ this._driversURL + '/updateDriver', JSON.stringify({name: driver.name,
        lastName: driver.lastName, username : driver.username, id: id}), { headers:this.headers })
    .map((res: Response) => res.json().data)
    .catch(this.handleError);
  }

  updatePassword(driver: any, id: any) {
    return this.http
    .put(`${Config.API}`+ this._driversURL + '/updatePassword', JSON.stringify({ password: driver.password, id: id}), { headers:this.headers })
    .map((res: Response) => res.json().data)
    .catch(this.handleError);
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
