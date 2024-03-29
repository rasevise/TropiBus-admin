import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../services/index';

@Component({
    templateUrl: './app/components/login/login.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(Router) private router: Router,
        @Inject(AuthenticationService) private authenticationService: AuthenticationService,
        @Inject(AlertService) private alertService: AlertService) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                    alert("Incorrect credentials");
                },
                );
    }
}
