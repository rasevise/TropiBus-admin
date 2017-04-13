import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
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

  getPaths(): Observable<Routes[]> {
    return this.http.get(this._routesURL)
    .map((res: Response) => res.json());
  }

  getPath(r_id: any): Observable<Routes[]> {
    return this.http.get(this._routesURL + '/getRoute?r_id=' + r_id)
    .map((res: Response) => res.json());
  }

  getStops(): Observable<Stops[]> {
    return this.http.get(this._stopsURL)
    .map((res: Response) => res.json());
  }

  getStopsFromRoute(r_id: any): Observable<Stops[]> {
    return this.http.get(this._stopsURL + '/getStopsFromRoute?r_id=' + r_id)
    .map((res: Response) => res.json());
  }
  
  delete(stop: any): Observable<any> {
    return this.http
    .delete('stops/deleteStop' + "/?name=" + stop, { headers:this.headers })
    .map((res: Response) => res.json())
    .subscribe(
      (res:Response) => { this.postResponse = res; console.log(res); }
    );
  }

  create(stop: any){
    return this.http
      .post('stops/addStop', JSON.stringify(stop), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }

  update(stop: any, i: any): Observable<any> {
    return this.http
      .put('stops/updateStop', JSON.stringify(stop), { headers:this.headers })
      .map((res: Response) => res.json().data)
      .subscribe((res:Response) => { this.postResponse = res; console.log(res); });
      // .catch(this.handleError);
  }

}