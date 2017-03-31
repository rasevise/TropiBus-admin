import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Routes } from './routes';
import { RoutesService } from './routes.service';
import { Http } from '@angular/http';

@Component({
    selector: 'routes',
    templateUrl: './app/components/routepaths/routes.component.html',
    providers: [ RoutesService ],
})

export class RoutesComponent{
    
    path: any[] = [];
    stops: any[] = [];

    constructor (@Inject(RoutesService) private service: RoutesService){
        //Get route paths
        service.getPaths()
        .subscribe(routes => this.path = routes);
        //Get route stops
        service.getStops()
        .subscribe(stops => this.stops = stops);
    }
}