import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Routes } from './routes';
import { Stops } from './stops';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RoutesService {
  
  private _routesURL = '/routes';
  private _stopsURL = '/stops';
  private headers = new Headers({'Content-Type': 'application/json'});
  postResponse:any;

  constructor (@Inject(Http) private http: Http ) {}

  getPaths(){
    return this.http.get(this._routesURL)
    .map((res: Response) => res.json())
  }

  getPath(r_id: any){
    return this.http.get(this._routesURL + '/getRoute?r_id=' + r_id)
    .map((res: Response) => res.json())
  }

  getStops(){
    return this.http.get(this._stopsURL)
    .map((res: Response) => res.json())
  }

  getStopsFromRoute(r_id: any){
    console.log("getting stops from route");
    return this.http.get(this._stopsURL + '/getStopsFromRoute?r_id=' + r_id)
    .map((res: Response) => res.json())
  }
  
  delete(stop_id: any, r_id:any){
    return this.http
    .delete(this._stopsURL + '/deleteStop' + "/?stop_id=" + stop_id + "&r_id=" + r_id, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
  }

  create(stop: any, route_id:number){
    return this.http
    .post(this._stopsURL + '/createStop', 
    JSON.stringify({stop_name: stop.name, stop_description: stop.description, 
      stop_latitude: stop.latitude, stop_longitude: stop.longitude, r_id: route_id}), 
    { headers:this.headers })
    .map((res: Response) => res.json())
  }

  update(stop: any, i: any){
    return this.http
    .put('stops/updateStop', JSON.stringify(stop), { headers:this.headers })
    .map((res: Response) => res.json().data)
    .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
  }

}