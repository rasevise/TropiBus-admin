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
                    this.registerService.getAdmin()
                    .subscribe(
                        pass => {
                            if(pass.admin_pass === true){
                                this.router.navigate(['/password']);
                            }
                    });
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.loading = false;
                    alert('Incorrect credentials');
                },
            );
    }

    forgotPass(){
        this.registerService.resetPass(this.email)
        .subscribe(
            data => {
                this.loading = false;
                alert('email sent to reset password');
            }
        )
    }
}
