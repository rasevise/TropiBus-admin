import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { RegisterService } from '../shared/register/register.service';
import { User } from '../profile/user';

@Component({
  moduleId: module.id,
  templateUrl: './password.html'
})

export class PasswordComponent {
    model: any = {};
    loading = false;
    user: any; 
    returnUrl: string;
    errorMessage: string;
    alerts: any = [];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public registerService: RegisterService) {}

    setPassword() {
        this.loading = true;
        this.registerService.setPassword(this.model.password)
            .subscribe(
                data => {
                    this.loading = false;
                    this.successAlert('Password successfully updated!');
                },
                error => {
                    this.errorMessage = <any>error;
                    this.loading = false;
                    this.errorAlert(this.errorMessage);
                },
                );
    }

    successAlert(message:string): void {
        this.alerts.push({
        type: 'success',
        msg: message,
        timeout: 3000
        });
    }

    errorAlert(message:string): void {
        this.alerts.push({
        type: 'warning',
        msg: message,
        timeout: 3000
        });
    }
}
