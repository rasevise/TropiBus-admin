
import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';
import { Bus} from './bus';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusDriverService } from './app.busdriverService'


@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
})

export class busdriverComponent{ 

  buses: any[] = [];
  drivers: any[] = [];
  bus = {id: 1, name: 'name', driver: 'driver', route: 'route', status:'status'};
  x:number;
  //   ngOnInit() {
  //   this.bus = {
  //     id: 2,
  //     name: '',
  //     driver: '',
  //     route: '',
  //     status: ''
  //   }
  // }

  constructor (@Inject(BusDriverService) private service: BusDriverService){
        service.getBuses()
        .subscribe(buses => this.buses = buses);
        service.getDrivers()
        .subscribe(drivers => this.drivers = drivers);
  }

  addBus(){
    this.buses.push(this.bus);
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



