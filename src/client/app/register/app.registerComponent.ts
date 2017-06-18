import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterService } from '../shared/register/register.service';

@Component({
  moduleId: module.id,
  templateUrl: './register.html'
})

export class RegisterComponent {
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

    register() {
        this.loading = true;
        this.registerService.register(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    this.loading = false;
                    console.log(data);
                    if(data.toString() === '23505'){
                        this.errorAlert('Username already exists');
                    }else {
                        this.model = {};
                        this.successAlert('User successfully created!');
                    }
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
