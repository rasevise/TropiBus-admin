import { Component, OnInit,ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Routes } from './routes';
import { Stops } from './stops';
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

  //Modal window Values
  m_title: any = '';
  m_body: any = '';
  m_desc: any = '';
  m_route: any;

  //route id from selected route
  r_id: any;
  @Input() m_stop: Stops;
  
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
  //set modal route and title
  setMTitle(title:any, route: any){
    this.m_route = route;
    this.m_title = title;
  }

  setButtonText(b_id:any, text:any){
    $('#'+b_id).html(text);
  }

  getMTitle(){
    return this.m_title;
  }

  setRoute(r_id:any){
    this.m_stop = new Stops(null, null, '', '', null, null);
    this.r_id = r_id;
    this.getRoute(r_id);
    this.getStopsFromRoute(r_id);
  }

  selectStop(stop:any){
    this.m_stop = stop;
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

  onModalClose(){
    $('#pathModal').on('hidden.bs.modal', () => {
    console.log("inside hide modal function");
    // this.clearMarkers(); 
    // this.clearPolylines();
    })
  }

  editStop(){
    this.service.update(this.m_stop)
    .subscribe(() => {
    this.getStopsFromRoute(this.r_id)});
  }

  deleteStop(){
    this.service.delete(this.m_stop.stop_id, this.r_id);
    this.getStopsFromRoute(this.r_id);
  }

  addStop(){
    this.service.create(this.m_stop, this.r_id)
    .subscribe(() => {
    this.getStopsFromRoute(this.r_id)});
    
  }

  clearPolylines(){
    this.polylinePaths.forEach((p:any) => {
      p.setMap(null);
    });
    this.polylinePaths = [];
  }

  clearMarkers(){
    this.locationMarkers.forEach((l:any) => {
      l.setMap(null);
    });
    this.locationMarkers = [];
  }

  getRoutes(){
    this.service.getPaths()
    .subscribe(routes => {
      this.clearMarkers();
      this.clearPolylines();
      this.routes = routes;
      this.loadRoutes();
    })
  }

  getRoute(r_id: any){
      this.loadRoute(r_id);
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
  this.clearPolylines();
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

  getStopsFromRoute(r_id: any){
      console.log("locationMarker length before add: " + this.stops.length);
      this.service.getStopsFromRoute(r_id)
      .subscribe(stops => {
        this.stops = stops;
        this.loadStops();
        console.log("locationMarker length after add: " + this.stops.length);
  })
  }

  
  loadStops(){
    this.clearMarkers();
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
      //info window content
      let content="<h4>"+stop_marker.name+"</h4><p>"+stop_marker.description+"</p>";
      this.addInfoWindow(stop_marker,content);
      this.locationMarkers.push(stop_marker);
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