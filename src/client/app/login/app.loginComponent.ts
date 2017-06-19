import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../shared/login/login.service';
import { RegisterService } from '../shared/register/register.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    errorMessage: string;
    email:any;
    confirm:any;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public loginService: LoginService,
        public registerService: RegisterService) {}

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.registerService.getAdminFromUsername(this.model.username)
            .subscribe(
                data => {
                    if(data.admin_status === true){
                        alert('Account already logged in!');
                    }else {
                    this.loginService.login(this.model.username, this.model.password)
                        .subscribe(
                            () => {
                                console.log('inside login')
                                if(data.admin_pass === true){
                                    this.router.navigate(['/password']);
                                }else {
                                    this.router.navigate([this.returnUrl]);
                                }
                                this.loading = false;
                            },
                            error => {
                                this.errorMessage = <any>error;
                                this.loading = false;
                                alert('Incorrect credentials');
                            },
                        );
                    }
                    this.loading = false;
            },
            error => {
                this.errorMessage = <any>error;
                this.loading = false;
                alert('user not found');
            });
    }

    forgotPass(){
        this.registerService.resetPass(this.email)
        .subscribe(
            data => {
                this.loading = false;
                console.log(data);
                alert('email sent to reset password');
            }
        )
    }
}
