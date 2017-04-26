import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../services/index';

@Component({
  selector: 'header',
  templateUrl: './app/components/header/header.html',
})
export class headerComponent  {
  returnUrl:string;
    constructor(
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(Router) private router: Router,
        @Inject(AuthenticationService) private authenticationService: AuthenticationService
        ){}

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
