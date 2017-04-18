
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus, Driver } from './busdriver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from './app.busdriverService';
import { RoutesService } from '../routepaths/routes.service';
import {Routes} from '../routepaths/routes';
declare var $:JQueryStatic;


@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
  providers: [RoutesService],
})

export class busdriverComponent{ 
 private myValue: number;
 private userNameValid: boolean = false;
  bus: Bus = new Bus(null, "","","","");
  driver: Driver = new Driver(null,"","","","","");
  route: Routes = new Routes();
  buses: any[] = [];
  drivers: any[] = [];
  routes:any;


  constructor (
  @Inject(BusDriverService) 
  @Inject(RoutesService) 
  private service: BusDriverService, 
  private Routeservice:RoutesService){

    service.getBuses()
    .subscribe(buses => this.buses = buses);
    service.getDrivers()
    .subscribe(drivers => this.drivers = drivers);
  }

    resetTempD(){
    this.driver.name = "";
    this.driver.lastName = "";
    this.driver.username = "";
  }
  setTempD(){
    this.driver.name = this.drivers[this.myValue].driver_firstname;
    this.driver.lastName = this.drivers[this.myValue].driver_lastname;
    this.driver.username = this.drivers[this.myValue].driver_username;
    this.driver.password = "";
  }

  resetTempB(){
    this.bus.name = "";

  }
  setTempB(){
    this.bus.name = this.buses[this.myValue].bus_name;

  }

  //  Buses Crud
  getBuses(): void {
    this.service
        .getBuses()
        .subscribe(buses => this.buses = buses);
  }


  addB(bus: Bus): void {
    for(var i : number = 0; i< this.routes.length;i++){
    console.log(this.routes[i].route_name);
  }
    this.service.createBus(bus);
    this.getBuses();
  }

  deleteB(i : number): void {
    console.log("id:" + this.buses[i].bus_id);
     console.log("index:" + i);
    this.service
        .deleteBus(this.buses[i].bus_id);
        this.getBuses();
  }

  editB(): void {
    this.service.updateBus(this.bus, this.buses[this.myValue].bus_id)
    this.getBuses();
  }

  ngOnInit(): void {
    this.getBuses();
  }



    //  Drivers Crud
    getDrivers(): void {
    this.service
        .getDrivers()
        .subscribe(drivers => this.drivers = drivers);
  }


  addD(driver:Driver): void {
    console.log("hello")
    this.service.createDriver(driver);
    this.getDrivers();
  }

  deleteD(i : number): void {
    this.service
        .deleteDriver(this.drivers[i].driver_id);
        this.getDrivers();
  }

  editD(): void {
    this.service.updateDriver(this.driver, this.drivers[this.myValue].driver_id)
    this.getDrivers();
  }

  ngOnInitD(): void {
    this.getDrivers();
    
  }



//Routes for modal
// ngOnInitR(): void {
//   this.getRoutes();
//       for(var i : number = 0; i< this.routes.length;i++){
//     console.log(this.routes[i].route_name);
//   }
// }

// getRoutes(){
//   this.Routeservice.getPaths()
//   .subscribe(routes => {
//       this.routes = routes;
//     })

//         for(var i : number = 0; i< this.routes.length;i++){
//     console.log(this.routes[i].route_name);
//   }
// }




//Verify username availability
checkUsername(){
   for(var i:number = 0; i < this.drivers.length; i++){
      //console.log("username:" + this.drivers[this.myValue].driver_username);
      console.log(this.drivers[i].driver_username);
      if(this.driver.username == this.drivers[i].driver_username){
        return false;
      }
    }

         return true; 
  }

checkUsernameEdit(){
   for(var i:number = 0; i < this.drivers.length; i++){
      console.log("username:" + this.driver.username);
      console.log(this.drivers[i].driver_username);
      if(this.driver.username == this.drivers[i].driver_username){
        return false;
       
      }
    }

   return true; 
  }
  




//Function for modals and values regarding delete and edit index
setValue(val:number) {
        this.myValue = val;
}


getValue(){
      return this.myValue;
}


closeAddDriver(modalId: String){
        if(this.checkUsername()){
          this.userNameValid = true;
          this.addD(this.driver)
          $('#'+ modalId).modal('hide')
        }
      else{
         this.userNameValid = false;
         $('#usernameModal').modal('show')
      }
   }
closeEditDriver(modalId: String){
        if(this.checkUsernameEdit()){
          this.userNameValid = true;
          this.editD();
          $('#'+ modalId).modal('hide');
        }
      else{
         this.userNameValid = false;
         $('#usernameModal').modal('show');
      }
   }

close(modalId: String){
      $('#'+ modalId).modal('hide');
}

}


