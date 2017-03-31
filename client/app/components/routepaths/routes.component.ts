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

    constructor (@Inject(RoutesService) private service: RoutesService){
        service.getPaths()
        .subscribe(routes => this.path = routes);
    }
}