
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus, Driver } from './busdriver';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from './app.busdriverService'


@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
  providers: [NgbModal],
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

  addDriver(){
    this.drivers.push(this.drivers);
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



