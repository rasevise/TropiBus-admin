import { Component, OnInit,ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Routes } from './routes';
import { RoutesService } from './routes.service';
import { Http } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap/modal';

declare var $:JQueryStatic;
declare var google:any;

@Component({
    selector: 'routes',
    templateUrl: './app/components/routepaths/routes.component.html',
    providers: [ RoutesService ],

})

export class RoutesComponent implements OnInit{
    
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pathModal') pathModal: ElementRef;
  map: any;
  routes:any;
  stops:any;
  locationMarkers:any;
  polylinePaths:any;

  //Modal Values
  m_title: any = '';
  m_body: any = '';
  m_desc: any = '';
  m_route: any;
  r_id: any;
  m_stop: {
    id: number,
    stop_id: number,
    name:string,
    description:string,
    latitude:number,
    longitude:number
  };

  setMTitle(title:any, route: any){
    this.m_route = route;
    this.m_title = title;
  }

  getMTitle(){
    return this.m_title;
  }

  constructor (@Inject(RoutesService) private service: RoutesService){}

  ngOnInit(){
  //checkInternet connection
  this.loadMap();
  this.routes=[];
  this.polylinePaths=[];
  this.locationMarkers=[];
  this.stops=[];

  //bug fix for grey map
  $('#map').css('height', '99%').css( 'width', '99%');
  $('#map').css('height', '100%').css( 'width', '100%');
  //
  }
  
  //JQuery Functions for boottrap functionality
  dropdownClick(){
    $('#routeSelectButton').dropdown();
  }

  scrollModalTop(modal: string){
    $('#' + modal).animate({ scrollTop: 0 }, 'fast');
  }

  openPathModal(){
    if(this.m_title != ''){
      $('#pathModal').modal('show');
    }
  }

  setButtonText(b_id:any, text:any){
    $('#'+b_id).html(text);
  }

  editStop(){
    // this.service.update(this.m_stop);
  }

  deleteStop(){
    this.service.delete(this.m_stop.stop_id, this.stops.id);
    this.clearMarkersOnly();
    this.getStopsFromRoute(this.m_stop.id);
  }

  addStop(){
    this.service.create(this.m_stop);
    this.clearMarkersOnly();
    this.getStopsFromRoute(this.m_stop.id);
  }

  clearMarkers(){
    this.locationMarkers.forEach((l:any) => {
      l.setMap(null);
      // l = null;
    });
    this.polylinePaths.forEach((p:any) => {
      p.setMap(null);
      // p = null;
    });
    // this.polylinePaths = null;
    this.polylinePaths = [];
    // this.locationMarkers = null;
    this.locationMarkers = [];
  }

  clearMarkersOnly(){
    this.locationMarkers.forEach((l:any) => {
      l.setMap(null);
      // l = null;
    });
    // this.locationMarkers = null;
    this.locationMarkers = [];
  }

  setRoute(r_id:any){
    this.clearMarkers();
    this.m_stop = null;
    this.r_id = r_id;
    this.getRoute(r_id);
    this.getStopsFromRoute(r_id);
  }

  selectStop(stop:any){
    this.m_stop = stop;
    this.m_stop.latitude = stop.latitude;
    this.m_stop.longitude = stop.longitude;
  }

  loadMap(){
    let latLng = new google.maps.LatLng(18.2013257,-67.1392801);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.trigger(this.map, 'resize');
    this.getRoutes();
  }

  getRoutes(){
    this.service.getPaths()
    .subscribe(routes => {
        this.routes = routes;
        this.loadRoutes();
    })
  }

  getRoute(r_id: any){
      this.loadRoute(r_id);
  }

  // getAllStops(){
  //   this.service.getStops()
  //     .subscribe(stops => {
  //       this.stops = stops;
  //   })
  // }

  getStopsFromRoute(r_id: any){
      console.log("locationMarker length before add: " + this.stops.length);
      this.service.getStopsFromRoute(r_id)
      .subscribe(stops => {
        this.stops = stops;
        this.loadStops();
        console.log("locationMarker length after add: " + this.stops.length);
  })
  }

  loadRoutes(){
    this.polylinePaths = [];
    for(var i=0;i<this.routes.length;i++){
        var route=this.routes[i];
        var polyline = new google.maps.Polyline({
          map: this.map,
          path: route.route_path,
          path_id: route.path_id,
          strokeColor: route.color,
          strokeOpacity: 1.0,
          strokeWeight: 4,
          id: route.route_id,
          name: route.route_name,
          color: route.color_name,
          description: route.route_description,
          area: route.route_area,
        });
        this.polylinePaths.push(polyline)
      }
  }

  loadRoute(r_id:any){
  this.polylinePaths = [];
  for(var i=0;i<this.routes.length;i++){
    if(r_id === this.routes[i].route_id){
      var route=this.routes[i];
      var polyline = new google.maps.Polyline({
        map: this.map,
        path: route.route_path,
        path_id: route.path_id,
        strokeColor: route.color,
        strokeOpacity: 1.0,
        strokeWeight: 4,
        id: route.route_id,
        name: route.route_name,
        color: route.color_name,
        description: route.route_description,
        area: route.route_area,
      });
      this.polylinePaths.push(polyline);
    }
    }
  }
  
  loadStops(){
    this.locationMarkers = [];
    for(var i=0;i<this.stops.length;i++){
      var stop=this.stops[i];
      var latlng = new google.maps.LatLng(stop.stop_latitude, stop.stop_longitude);
      let stop_marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latlng,
        id: stop.route_id,
        stop_id: stop.stop_id,
        name: stop.stop_name,
        description: stop.stop_description,
        latitude: stop.stop_latitude,
        longitude: stop.stop_longitude
      });
      this.locationMarkers.push(stop_marker);

      //info window content
      let content="<h4>"+stop_marker.name+"</h4><p>"+stop_marker.description+"</p>"
      this.addInfoWindow(stop_marker,content)
    }
  }

  addInfoWindow(item:any,content:any){
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(item, 'click', (event:any) => {
    if(!item.open){
        infowindow.setPosition(event.latLng)
        infowindow.open(this.map,item);
        item.open = true;
    }
    else{
        infowindow.close();
        item.open = false;
    }
    google.maps.event.addListener(this.map, 'click', function() {
        infowindow.close();
        item.open = false;
    });
    });
  }
}