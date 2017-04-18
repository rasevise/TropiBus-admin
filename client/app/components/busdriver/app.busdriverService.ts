import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Driver } from './busdriver';
import { Bus } from './busdriver';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

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
    .map((res: Response) => res.json());
    // .do(data => console.log('JSON length: ' + data.length));
  }
      deleteBus(id: number){
        console.log("deleteservice i :" + id)
    return this.http
    .delete('/buses/deleteBus' + "/?id=" + id, { headers: this.headers })
    .map((res: Response) => res.json())
    .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
  }

    createBus(bus: any) {
    return this.http
      .post('/buses/addBus', JSON.stringify({name: bus.name, routeid: bus.route, driverid: bus.driver, status: bus.status
         }), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }
    updateBus(bus: any, id: number) {
    return this.http
      .put('/buses/updateBus', JSON.stringify({name: bus.name, id: id, routeid: bus.route, driverid: bus.driver, status: bus.status}), { headers:this.headers })
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
    .map((res: Response) => res.json());
    // .do(data => console.log('JSON length: ' + data.length));
  }

   deleteDriver(id: number){
    return this.http
    .delete('drivers/deleteDriver' + "/?id=" + id, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe(
      (res:Response) => { this.postResponse = res; console.log(res); }
    );
  }
    createDriver(driver: any) {
    return this.http
      .post('drivers/addDriver', JSON.stringify({name: driver.name,
         lastName: driver.lastName, username : driver.username, password: driver.password}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }
    updateDriver(driver: any, id: any) {
    return this.http
      .put('drivers/updateDriver', JSON.stringify({name: driver.name,
         lastName: driver.lastName, username : driver.username, password: driver.password, id: id}), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
    }
  
}