import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Routes } from '../../routepaths/routes';
import { Stops } from '../../routepaths/stops';
import { Config } from '../config/env.config';

@Injectable()
export class RoutesService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http ) {}

  getPaths() {
    return this.http.get(`${Config.API}/routes`, {headers: this.headers})
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  getBusLocation() {
    return this.http.get(`${Config.API}/routes/getBusLocation`, {headers: this.headers})
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  getPath(r_id: any) {
    return this.http.get(`${Config.API}/routes/getRoute?r_id=` + r_id, {headers: this.headers})
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  getStops(): Observable<string[]> {
    return this.http.get(`${Config.API}/stops`)
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  getStopsFromRoute(r_id: any): Observable<string[]> {
    return this.http.get(`${Config.API}/stops/getStopsFromRoute?r_id=` + r_id, {headers: this.headers})
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  delete(stop_id: any, r_id:any): Observable<string[]> {
    return this.http
    .delete(`${Config.API}/stops/deleteStop` + '/?stop_id=' + stop_id + '&r_id=' + r_id, { headers:this.headers })
    .map((res: Response) => res.json())
  }

  create(stop: any, route_id:number): Observable<string[]> {
    return this.http
    .post(`${Config.API}/stops/createStop`,
    JSON.stringify({stop_name: stop.name, stop_description: stop.description,
      stop_latitude: stop.latitude, stop_longitude: stop.longitude, r_id: route_id}),
    { headers:this.headers })
    .map((res: Response) => res.json());
  }

  update(stop: any): Observable<string[]> {
    return this.http
    .put(`${Config.API}/stops/updateStop`, JSON.stringify({stop_name: stop.name, stop_description: stop.description, s_id: stop.stop_id}),
    { headers:this.headers })
    .map((res: Response) => res.json().data);
  }

  updateOrder(stops: any[]): Observable<string[]> {
    return this.http
    .put(`${Config.API}/stops/updateStopOrder`, JSON.stringify(stops),
    { headers:this.headers })
    .map((res: Response) => res.json().data);
  }

  updateRoute(route: any): Observable<string[]> {
    return this.http
    .put(`${Config.API}/routes/updateRoute`, JSON.stringify({route_name: route.route_name, route_description: route.route_description, route_id: route.route_id}),
    { headers:this.headers })
    .map((res: Response) => res.json().data);
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
