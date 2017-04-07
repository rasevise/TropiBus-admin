
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus, Driver } from './busdriver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from './app.busdriverService'
declare var $:JQueryStatic;


@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
  providers: [],
})

export class busdriverComponent{ 
 private myValue: number;
 private userNameValid: boolean = false;
  bus: Bus = new Bus();
  driver: Driver = new Driver();
  buses: any[] = [];
  drivers: any[] = [];


  // bus = {id: 1, name: 'name', driver: 'driver', route: 'route', status:'status'};

  constructor (@Inject(BusDriverService) private service: BusDriverService){

    service.getBuses()
    .subscribe(buses => this.buses = buses);
    service.getDrivers()
    .subscribe(drivers => this.drivers = drivers);
  }
  //  Buses Crud
    getBuses(): void {
    this.service
        .getBuses()
        .subscribe(buses => this.buses = buses);
  }


  addB(bus: Bus): void {
    this.service.createBus(bus);
    this.getBuses();
  }

  deleteB(i : number): void {
    this.service
        .deleteBus(i);
        this.getBuses();
  }

  saveB(): void {
    this.service.updateBus(this.bus, this.getValue())
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
        .deleteDriver(i);
        this.getDrivers();
  }

  saveD(): void {
    this.service.updateDriver(this.bus, this.getValue())
    this.getDrivers();
  }

  ngOnInitD(): void {
    this.getDrivers();
  }






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setValue(val:number) {
        this.myValue = val;
    }
    getValue(){
      return this.myValue;
    }
      close(modalId: String){
    $('#'+ modalId).modal('hide')
  }

}

  //  getTempBus(x: number){
  //    console.log(this.buses[x].name);
  //     return this.buses[x];
      
  //   }
  //      getTempDriver(x: number){
  //     return this.drivers[x];
  //   }
  // addBus(bus: Bus){
  //      var temp_bus= new Bus();
  //   temp_bus.name = bus.name;
  //   temp_bus.driver = bus.driver;
  //   temp_bus.route = bus.route;
  //   temp_bus.status = bus.status;
    
  //   this.bus.name="";
  //   this.bus.driver="";
  //   this.bus.route="";
  //   this.bus.status="";
  //   this.buses.push(temp_bus);
  // }

  // addDriver(driver: Driver){
  //   var temp_driver= new Driver();
  //   temp_driver.name = driver.name;
  //   temp_driver.lastName = driver.lastName;
  //   temp_driver.username = driver.username;
  //   temp_driver.password = driver.password;
    
  //   this.driver.name="";
  //   this.driver.lastName="";
  //   this.driver.username="";
  //   this.driver.password="";
  //   this.drivers.push(temp_driver);
  
  // }

  //   deleteBus(i: any){
  //     this.buses.splice(i , 1);
  // }

  //  deleteDriver(i: any){
  //     this.drivers.splice(i , 1);
  // }
      
      
  //  editBus(bus:Bus){
  
  //   var temp_bus= new Bus();
      
  //     temp_bus.name = bus.name;
  //     temp_bus.driver = bus.driver;
  
  //     this.bus.name="";
  //     this.bus.driver="";

  //     this.buses.splice(this.myValue, 1);
  //     this.buses.splice(this.myValue, 0, temp_bus)  
      
      
  // }

  // editDriver(driver:Driver){
  
  //   var temp_driver= new Driver();
  //     temp_driver.id = driver.id;
  //     temp_driver.name = driver.name;
  //     temp_driver.lastName = driver.lastName;
  //     temp_driver.username = driver.username;
  //     temp_driver.password = driver.password;
     
 
  //       this.driver.name="";
  //       this.driver.lastName="";
  //       this.driver.username ="";
  //       this.driver.password ="";

  //         this.drivers.splice(this.myValue, 1);
  //         this.drivers.splice(this.myValue, 0, temp_driver)  
      
      
  // }

  // checkUsername(username : String){
  //   for(var i:number = 0; i < this.drivers.length; i++){
  //     if(username == this.drivers[i].username){
  //       return false
       
  //     }
      
  //   return true;
  //   }
    
  // }



//  constructor(
//     private busService: busService,
//      private location: Location
//  ){}

// bus : Bus;


  // save(): void {
  //   this.busService.update(this.bus)
  //     .then(() => this.goBack());
  // }
  // goBack(): void {
  //   this.location.back();
  // }



