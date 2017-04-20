
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
  bus: Bus = new Bus(null, "",null,null,"");
  driver: Driver = new Driver(null,"","","","","","");
  route:any;
  buses: any[] = [];
  drivers: any[] = [];
  routes:any[] = [];


  constructor (
  @Inject(BusDriverService) 
  private service: BusDriverService, 
  @Inject(RoutesService) 
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
  setTempD(driver: Driver){
    this.driver.name = this.drivers[this.myValue].driver_firstname;
    this.driver.lastName = this.drivers[this.myValue].driver_lastname;
    this.driver.username = this.drivers[this.myValue].driver_username;
    this.driver.password = this.drivers[this.myValue].driver_password;
    this.driver.confirmpassword = this.drivers[this.myValue].driver_password;
  }

  resetTempB(){
    this.bus.name = "";
    this.bus.driver= null;
    this.bus.route = null;
    this.bus.status = null;

  }
  setTempB(){
    this.bus.name = this.buses[this.myValue].bus_name;
    this.bus.status = this.buses[this.myValue].bus_status;
    this.bus.route = this.buses[this.myValue].route_id;

  }

  //  Buses Crud
  getBuses(): void {
    this.service
        .getBuses()
        .subscribe(buses => this.buses = buses);
  }


  addB(bus: Bus): void {
    console.log("status:" + bus.status);
    this.service.createBus(bus).subscribe(() => { this.getBuses() });
  }

  deleteB(): void {
    this.service
        .deleteBus(this.buses[this.myValue].bus_id).subscribe(() => {
          this.getBuses();
          });;
        
  }

  editB(): void {
    this.service.updateBus(this.bus, this.buses[this.myValue].bus_id).subscribe(() => { 
        this.getBuses();
     });
    
  }

  ngOnInit(): void {
    this.getBuses();
      this.getRoutes();
  }



    //  Drivers Crud
    getDrivers(): void {
    this.service
        .getDrivers()
        .subscribe(drivers => this.drivers = drivers);
  }


  addD(driver:Driver): void {
   
console.log("password:" + this.driver.password);
    this.service.createDriver(driver);
    this.getDrivers();
  }

  deleteD(): void {
    this.service
        .deleteDriver(this.drivers[this.myValue].driver_id);
        this.getDrivers();
  }

  editD(): void {
    this.service.updateDriver(this.driver, this.drivers[this.myValue].driver_id)
    this.getDrivers();
  }

  ngOnInitD(): void {
    this.getDrivers();
    
  }
getAssignedRoute(id:number): String{
  console.log("id:" + id);
  for(var x: number = 0; x < this.routes.length; x++){
    console.log("x:" + x);
    console.log("route id:" + this.routes[x].route_id);
    if(id == this.routes[x].route_id){
      return this.routes[x].route_name
    }
    
  }
  return "";
  // this.route =this.routes.filter(x => x.route_id === this.bus.route)
  //       return this.route[2];
}


//Routes for modal
ngOnInitR(): void {
  this.getRoutes();
      //for(var i : number = 0; i< this.routes.length;i++){
   // console.log(this.routes[i].route_name);
 // }
}

getRoutes(){
  this.Routeservice.getPaths()
  .subscribe(routes => {
      this.routes = routes;
    })

        
}




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
// getRouteName(){
// this.route=this.routes.filter(x => x.route_id === this.route.id)
// }

setValue(val:number) {
        this.myValue = val;
}


getValue(){
      return this.myValue;
}

confirmDeleteDriver(){
    var c = confirm("Are you sure you want to delete driver: " + this.driver.name);
    if (c == true) {
        this.deleteD();
    }
  }

confirmDeleteBus(){
    var c = confirm("Are you sure you want to delete bus: " + this.bus.name);
    if (c == true) {
        this.deleteB();
    }
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


