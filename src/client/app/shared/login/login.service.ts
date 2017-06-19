import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config/env.config';

// import 'rxjs/add/operator/do';  // for debugging

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    login(username: string, password: string): Observable<any>  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${Config.API}/login/authenticate`, JSON.stringify({ username: username, password: password }), {headers: headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            })
            // .do(data => console.log('server data:', data))  // debug
            .catch(this.handleError);
    }

    logout(id:any): Observable<any>  {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(`${Config.API}/login/logout`, JSON.stringify({id: id}), {headers: headers})
            .map((response: Response) => {
                let res = response.json();
                if(res.result === 'logout'){
                // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
                }
            })
            // .do(data => console.log('server data:', data))  // debug
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