import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/login/login.service';

@Component({
  moduleId: module.id,
<<<<<<< HEAD
  selector: 'header',
=======
  selector: 'header-component',
>>>>>>> b43fd3f043c805e075d2e46b68e72515c72b5c71
  templateUrl: 'header.html',
})
export class HeaderComponent  {
  returnUrl:string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public loginService: LoginService
        ) {}

    logout() {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
}
