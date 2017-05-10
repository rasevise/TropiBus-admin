/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus, Driver } from './busdriver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from '../shared/busdriver/app.busdriverService';
import { RoutesService } from '../shared/routepaths/routes.service';
import { Routes } from '../routepaths/routes';


@Component({
  moduleId: module.id,
  selector: 'busdriver',
  templateUrl: './busdriver.html',
  providers: [RoutesService],
})

export class BusDriverComponent{

  bus: Bus = new Bus(null, '',null,null,'');
  driver: Driver = new Driver(null,'','','','','','');
  route:any;
  buses: any[] = [];
  drivers: any[] = [];
  routes:any[] = [];

  private myValue: number;
  private userNameValid: boolean = false;

  constructor (
  private service: BusDriverService,
  private Routeservice:RoutesService){

    service.getBuses()
    .subscribe(buses => this.buses = buses);
    service.getDrivers()
    .subscribe(drivers => this.drivers = drivers);
  }

  ngOnInit(): void {
    this.getBuses();
    this.getRoutes();
    this.getDrivers();
  }

    resetTempD(){
    this.driver.name = null;
    this.driver.lastName = null;
    this.driver.username = null;
    this.driver.password = null;
    this.driver.confirmpassword = null;
  }
  setTempD(driver: Driver){
    this.driver.name = this.drivers[this.myValue].driver_firstname;
    this.driver.lastName = this.drivers[this.myValue].driver_lastname;
    this.driver.username = this.drivers[this.myValue].driver_username;
    this.driver.password = this.drivers[this.myValue].driver_password;
    this.driver.confirmpassword = this.drivers[this.myValue].driver_password;
  }

  resetTempB(){
    this.bus.name = null;
    this.bus.route = null;
    this.bus.status = null;
    this.bus.driver = null;

  }
  setTempB(){
    this.bus.name = this.buses[this.myValue].bus_name;
    this.bus.status = this.buses[this.myValue].bus_status;
    this.bus.driver = this.buses[this.myValue].driver_id;
    this.bus.route = this.buses[this.myValue].route_id;
  }

  //  Buses Crud
  getBuses(): void {
    this.service
        .getBuses()
        .subscribe(buses => this.buses = buses);
  }


  addB(bus: Bus): void {
    this.service.createBus(bus).subscribe(() => { this.getBuses() });
  }

  deleteB(): void {
    this.service
        .deleteBus(this.buses[this.myValue].bus_id).subscribe(() => {
          this.getBuses();
          });;

  }

  editB(): void {
    this.service.updateBus(this.bus, this.buses[this.myValue].bus_id, this.buses[this.myValue]).subscribe(() => {
        this.getBuses();
     });

  }

    //  Drivers Crud
    getDrivers(): void {
    this.service
        .getDrivers()
        .subscribe(drivers => this.drivers = drivers);
  }


  addD(driver:Driver): void {
    this.service.createDriver(driver).subscribe(() => {this.getDrivers() });
    
  }

  deleteD(): void {
    this.service
        .deleteDriver(this.drivers[this.myValue].driver_id).subscribe(() => {
        this.getDrivers();
        });;
  }

  editD(): void {
    this.service.updateDriver(this.driver, this.drivers[this.myValue].driver_id).subscribe(() => {
    this.getDrivers();
    });
  }

  ngOnInitD(): void {
    this.getDrivers();

  }
getAssignedRoute(id:number): String{
  for(var x: number = 0; x < this.routes.length; x++){
    if(id === this.routes[x].route_id){
      return this.routes[x].route_name;
    }

  }
  return '';
}


//Routes for modal
ngOnInitR(): void {
  this.getRoutes();
}

getRoutes(){
  this.Routeservice.getPaths()
  .subscribe(routes => {
      this.routes = routes;
    });
}


//Verify bus name availability
checkBusName()
{
   for(var i:number = 0; i < this.buses.length; i++)
   {
      if(this.bus.name === this.buses[i].bus_name)
      {
        return false;
      }
    }

         return true; 
  }

checkEditBusName()
{
   for(var i:number = 0; i < this.buses.length; i++)
   {
      if((this.bus.name === this.buses[i].bus_name) && (this.myValue !== i))
      {
        return false;
      }
    }

         return true; 
  }

//Close bus modals
  closeBus(modalId: String)
  {
        if(this.checkBusName())
        {
          this.addB(this.bus)
          $('#'+ modalId).modal('hide')
        }
      else{
         $('#busNameModal').modal('show')
      }
   }

  closeEditBus(modalId: String)
  {
        if(this.checkEditBusName())
        {
          this.editB()
          $('#'+ modalId).modal('hide')
        }
      else{
         $('#busNameModal').modal('show')
      }
   }

//Verify username availability
checkUsername(){
  console.log("usernmae" + this.driver.username);
   for(var i:number = 0; i < this.drivers.length; i++){
      if(this.driver.username === this.drivers[i].driver_username){
        return false;
      }
    }
    return true;
  }

checkUsernameEdit(){
   for(var i:number = 0; i < this.drivers.length; i++){
      if((this.driver.username == this.drivers[i].driver_username) && (this.myValue !== i)){
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

confirmDeleteDriver(){
    var c = confirm("Are you sure you want to delete driver: ");
    if (c == true) {
        this.deleteD();
    }
  }

confirmDeleteBus(){
    var c = confirm("Are you sure you want to delete bus: ");
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


