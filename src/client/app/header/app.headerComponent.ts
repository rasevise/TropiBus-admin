import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/login/login.service';

@Component({
  moduleId: module.id,
  selector: 'header',
  templateUrl: 'header.html',
})
export class headerComponent  {
  returnUrl:string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public loginService: LoginService
        ){}

    logout() {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
}
