import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Driver } from './busdriver';
import { Bus } from './busdriver';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class BusDriverService {
  private _busesURL = '/buses';
  private _driversURL = '/drivers';
  private headers = new Headers({'Content-Type': 'application/json'});
  postResponse:any;
  constructor (@Inject(Http) private http: Http ) {}

 
//Buses//

    getBuses(): Observable<any[]> {
    return this.http.get(this._busesURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }
   
<<<<<<< HEAD
      deleteBus(i: number): Observable<any> {
=======
      deleteBus(i: number): Observable<any[]> {
>>>>>>> 623f6abcc97991af4a666402ad2b5b4524d1d5d4
    return this.http
    .delete('buses/deleteBus' + "/?index=" + i, { headers: this.headers })
    .map((res: Response) => res.json())
    .subscribe(
      (res:Response) => { this.postResponse = res; console.log(res); }
    );
  }

<<<<<<< HEAD
    createBus(bus: any): Observable<any> {
=======
    createBus(bus: any):  Observable<any[]>{
>>>>>>> 623f6abcc97991af4a666402ad2b5b4524d1d5d4
    return this.http
      .post('drivers/addDriver', JSON.stringify({name: bus.name,
         driver: bus.driver, route : bus.route, status: bus.status}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }

<<<<<<< HEAD
    updateBus(bus: any, i: any): Observable<any> {
=======
    updateBus(bus: any, i: any): Observable<any[]> {
>>>>>>> 623f6abcc97991af4a666402ad2b5b4524d1d5d4
    return this.http
      .put('buses/updateBus', JSON.stringify({name: bus.name,
         driver: bus.driver, route : bus.route, status: bus.status, index: i}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
    }
        private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



//Drivers//


  getDrivers(): Observable<any[]> {
    return this.http.get(this._driversURL)
    .map((res: Response) => res.json())
    .do(data => console.log('JSON length: ' + data.length));
  }
<<<<<<< HEAD
   deleteDriver(i: number): Observable<any> {
=======
   deleteDriver(i: number): Observable<any[]> {
     console.log(i);
>>>>>>> 623f6abcc97991af4a666402ad2b5b4524d1d5d4
    return this.http
    .delete('drivers/deleteDriver' + "/?index=" + i, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe(
      (res:Response) => { this.postResponse = res; console.log(res); }
    );
  }

<<<<<<< HEAD
    createDriver(driver: any): Observable<any> {
=======
    createDriver(driver: any):  Observable<any[]>{
>>>>>>> 623f6abcc97991af4a666402ad2b5b4524d1d5d4
    return this.http
      .post('drivers/addDriver', JSON.stringify({name: driver.name,
         lastName: driver.lastName, username : driver.username, password: driver.password}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }

<<<<<<< HEAD
    updateDriver(driver: any, i: any): Observable<any> {
=======
    updateDriver(driver: any, i: any): Observable<any[]> {
>>>>>>> 623f6abcc97991af4a666402ad2b5b4524d1d5d4
    return this.http
      .put('drivers/updateMessage', JSON.stringify({name: driver.name,
         lastName: driver.lastName, username : driver.username, password: driver.password, index: i}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
    }
  
}