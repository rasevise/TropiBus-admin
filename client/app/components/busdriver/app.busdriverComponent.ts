
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus, Driver } from './busdriver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from './app.busdriverService';
import { RoutesService } from '../routepaths/routes.service';
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
  buses: any[] = [];
  drivers: any[] = [];
  routes:any;


  // bus = {id: 1, name: 'name', driver: 'driver', route: 'route', status:'status'};

  constructor (@Inject(BusDriverService) private service: BusDriverService, private Routeservice:RoutesService){

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
    // this.routes=[];
  }

  //   getRoutes(){
  //   this.Routeservice.getPaths()
  //   .subscribe(routes => {
  //       this.routes = routes;
  //   })
  // }






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



