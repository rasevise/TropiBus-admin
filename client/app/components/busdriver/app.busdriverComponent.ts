import { Component } from '@angular/core';

@Component({
  selector: 'busdriver',
  templateUrl: './app/components/busdriver/busdriver.html',
})
export class busdriverComponent  {
  busProperties=[
    {name: "Bus A", driver: "Juan", route: "Route A", status: "active"},
    {name: "Bus B", driver: "Pedro", route: "Route B", status: "offline"},
    {name: "Bus C", driver: "Jorge", route: "Route C", status: "offline"}
    ]
    
}
interface busProperties {
 name: string;
 driver: string;
 route: string;
status: string;
}


