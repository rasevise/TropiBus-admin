import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { AlertService, loginService } from '../services/index';
import { LoginService } from '../shared/login/login.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    errorMessage: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public loginService: LoginService) {}

    ngOnInit() {
        // reset login status
        this.loginService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.loginService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.loading = false;
                    alert('Incorrect credentials');
                },
                );
    }
}
