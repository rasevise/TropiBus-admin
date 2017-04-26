import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    loginURL = '/login';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(@Inject(Http) private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(this.loginURL + '/authenticate', JSON.stringify({ username: username, password: password }), { headers:this.headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}