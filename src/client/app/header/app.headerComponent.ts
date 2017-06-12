import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/login/login.service';
import { RoutesComponent } from '../routepaths/routes.component';
import { Config } from '../shared/config/env.config';

@Component({
  moduleId: module.id,
  selector: 'header-component',
  templateUrl: 'header.html',
})
export class HeaderComponent  {
  returnUrl:string;
  //calls child component
  @ViewChild(RoutesComponent) routecomponent: RoutesComponent;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public loginService: LoginService
        ) {}
    
  public logoClick(): void{
    console.log('selected map tab');
    this.router.navigate(['/']);
    this.routecomponent.loadMap();
  }

    logout() {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
}
