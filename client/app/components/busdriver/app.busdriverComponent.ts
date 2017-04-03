
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus, Driver } from './busdriver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from './app.busdriverService'


@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
  providers: [],
})

export class busdriverComponent{ 

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

  addBus(bus: Bus){
    this.buses.push(bus);
  }

  addDriver(driver: Driver){
    this.drivers.push(driver);
  }

    deleteBus(i: any){
      this.buses.splice(i , 1);
  }

      deleteDriver(i: any){
      this.drivers.splice(i , 1);
  }

}

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



