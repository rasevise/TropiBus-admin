// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from './app.loginService';
// import { AlertService } from './app.alertService';

// @Component({
//   selector: 'login',
//   templateUrl: './app/components/login/login.html',
// })
// export class loginComponent{

//  model: any = {};
//     loading = false;
//     returnUrl: string;

//     constructor(
//         private route: ActivatedRoute,
//         private router: Router,
//         private authenticationService: AuthenticationService,
//         private alertService: AlertService) { }

//     ngOnInit() {
//         // reset login status
//         this.authenticationService.logout();

//         // get return url from route parameters or default to '/'
//         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//     }

//     login() {
//         this.loading = true;
//         this.authenticationService.login(this.model.username, this.model.password)
//             .subscribe(
//                 (data:any) => {
//                     this.router.navigate([this.returnUrl]);
//                 },
//                 (error:any) => {
//                     this.alertService.error(error);
//                     this.loading = false;
//                 });
//     }

// }