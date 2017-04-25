import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../services/index';

@Component({
    templateUrl: './app/components/register/register.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        @Inject(Router) private router: Router,
        @Inject(AlertService) private alertService: AlertService) { }

    register() {
        this.loading = true;
        // this.userService.create(this.model)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
