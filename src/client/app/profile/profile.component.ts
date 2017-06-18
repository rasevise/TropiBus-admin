import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { RegisterService } from '../shared/register/register.service';
import { User } from './user';

@Component({
  moduleId: module.id,
  templateUrl: './profile.html'
})

export class ProfileComponent implements OnInit {
  //stop and route from selected stop in modal
  @Input() user: User = new User(-1, '', '', '');

    loading = false;
    returnUrl: string;
    errorMessage: string;
    alerts: any = [];
    first:FormControl;
    last:FormControl;
    oldpassword :FormControl;
    password :FormControl;
    repassword:FormControl;
    admins:any = [];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public registerService: RegisterService) {}

    ngOnInit(){
        this.getCurrentUser();
        this.first = new FormControl('', [Validators.required]);
        this.last = new FormControl('', [Validators.required]);
    }

    getCurrentUser(){
        this.registerService.getAdmin()
        .subscribe(
            data => {
                this.user.name = data.admin_first_name;
                this.user.last = data.admin_last_name;
                this.user.id = data.admin_id;
            }
        )
    }

    getAdmins(){
        this.registerService.getAdmins()
        .subscribe(
            data => {
                this.admins = data;
            }
        )
    }

    updateProfile() {
        this.loading = true;
        this.registerService.updateProfile(this.user)
            .subscribe(
                data => {
                    this.loading = false;
                    this.successAlert('User successfully updated!');
                },
                error => {
                    this.errorMessage = <any>error;
                    this.loading = false;
                    this.errorAlert(this.errorMessage);
                },
                );
    }
    updatePassword() {
    this.loading = true;
    this.registerService.updatePassword(this.password, this.oldpassword)
        .subscribe(
            data => {
                this.loading = false;
                $('#change-password').modal('hide');
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
