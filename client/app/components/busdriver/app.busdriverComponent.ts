import { Component, Inject } from '@angular/core';
import { BusDriverService } from './app.busdriverService'

@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
})
export class busdriverComponent  {
  busProperties : any[] = []

    constructor (@Inject(BusDriverService) private service: BusDriverService){
        service.getBuses()
        .subscribe(buses => this.busesGet(buses));
    }

    busesGet(buses: any[]){
      this.busProperties = buses;
    }
    
}
interface busProperties {
 name: string;
 driver: string;
 route: string;
 status: string;
}


