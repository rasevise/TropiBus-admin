
import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Location }   from '@angular/common';

import { Bus} from './bus';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { BusDriverService } from './app.busdriverService'


@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
 
  
})



export class busdriverComponent{ 
  bus: any[];

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
        .subscribe(buses => this.bus = buses);
    }



 


 
   Bus = [
    {id: 1, name: "Bus A", driver: "Juan", route: "Route A", status: "active"},
    { id: 2 ,name: "Bus B", driver: "Pedro", route: "Route B", status: "offline"},
    {id: 3 ,name: "Bus C", driver: "Jorge", route: "Route C", status: "offline"}
    ]

      Driver =[
    { id: 1, name: "Juan", lastName: "Juan", route: "Route A", status: "active"},
    {  id: 2, name: "Juan", lastName: "Pedro", route: "Route B", status: "active"},
    {  id: 3, name: "Juan", lastName: "Jorge", route: "Route C", status: "active"}
    ];
addBus(bus: any){
this.bus.push(bus);
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



