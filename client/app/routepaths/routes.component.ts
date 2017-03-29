import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Routes } from './routes';
import { RoutesService } from './routes.service';
import { Http } from '@angular/http';

@Component({
    selector: 'routes',
    templateUrl: './app/routepaths/routes.component.html',
    providers: [RoutesService],
})

export class RoutesComponent{
    
    path: any[] = [];
    pathA: any[] = [];
    pathB: any[] = [];
    pathC: any[] = [];
    pathD: any[] = [];
    pathE: any[] = [];
    pathF: any[] = [];
    pathG: any[] = [];
    pathH: any[] = [];
    pathI: any[] = [];

    constructor (@Inject(RoutesService) private service: RoutesService){
        service.getPaths()
        .subscribe(routes => this.routesGet(routes));
    }

    routesGet(routes: any[]){
        this.pathA = routes[0];
        this.pathB = routes[1];
        this.pathC = routes[2];
        this.pathD = routes[3];
        this.pathE = routes[4];
        this.pathF = routes[5];
        this.pathG = routes[6];
        this.pathH = routes[7];
        this.pathI = routes[8];
    }
}