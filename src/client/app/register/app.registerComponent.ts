import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './register.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        @Inject(Router) private router: Router) { }

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
