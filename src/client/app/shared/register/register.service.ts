import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config/env.config';

// import 'rxjs/add/operator/do';  // for debugging

@Injectable()
export class RegisterService {

    constructor(private http: Http) { }

    register(user: any): Observable<any>  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${Config.API}/register`, 
        JSON.stringify({ name: user.firstName, last: user.lastName, username: user.username, password: user.password, email: user.email}), 
        {headers: headers})
        .map((response: Response) => 
            response.json()
            )
        // .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
 
    updateProfile(user: any): Observable<any>  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(`${Config.API}/register/update`, 
        JSON.stringify({ name: user.name, last: user.last, email: user.email, id: user.id }), 
        {headers: headers})
        .map((response: Response) => 
            response.json()
        )
        // .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    setPassword(password: any): Observable<any>  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let id = JSON.parse(localStorage.getItem('currentUser')).admin
        return this.http.put(`${Config.API}/register/setPassword`, 
        JSON.stringify({password: password, id: id }), 
        {headers: headers})
        .map((response: Response) => 
            response.json()
        )
        // .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    updatePassword(password: any, oldpassword: any): Observable<any>  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let id = JSON.parse(localStorage.getItem('currentUser')).admin
        return this.http.put(`${Config.API}/register/updatePassword`, 
        JSON.stringify({password: password, id: id, oldpassword: oldpassword }), 
        {headers: headers})
        .map((response: Response) => 
            response.json()
        )
        // .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    getAdmin(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let id = JSON.parse(localStorage.getItem('currentUser')).admin
        return this.http.get(`${Config.API}/register/getAdmin?id=` + id, { headers:headers })
        .map((response: Response) => response.json())
        // .catch(this.handleError);
    }

    getAdminFromUsername(user:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(`${Config.API}/register/getAdminFromUser?user=` + user, { headers:headers })
        .map((response: Response) => response)
        .catch(this.handleError);
    }

    getAdmins(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(`${Config.API}/register/getAdmins`, { headers:headers })
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    resetPass(email: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(`${Config.API}/sendmail`,{ email: email },  { headers:headers })
        .map((response: Response) => response.json())
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