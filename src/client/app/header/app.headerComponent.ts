import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/login/login.service';
import { RoutesComponent } from '../routepaths/routes.component';
import { RegisterService } from '../shared/register/register.service';
import { Config } from '../shared/config/env.config';

@Component({
  moduleId: module.id,
  selector: 'header-component',
  templateUrl: 'header.html',
})
export class HeaderComponent implements OnInit {
  returnUrl:string;
  admin_name:string;
  admin_id:any;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public loginService: LoginService,
        public registerService: RegisterService
        ) {}
        
 ngOnInit() {
    this.loadInfo();
 }

  loadInfo(){
    if(!this.checkLogged()){
      this.registerService.getAdmin()
    .subscribe(
      data => {
        this.admin_name = data.admin_first_name + ' ' + data.admin_last_name;
        this.admin_id = data.admin_id;
      }
    )}
  }

  checkLogged(){
    return (localStorage.getItem('currentUser') === null)
  }

  logout() {
    this.registerService.getAdmin()
    .subscribe(
      data => {
      this.loginService.logout(data.admin_id)
      .subscribe(data_logout => {
        // console.log('logout response: ' + data); //debug
        location.reload();
      });
      });
  }
}
