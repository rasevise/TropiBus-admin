/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
import { Component, OnInit,ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Routes } from './routes';
import { Stops } from './stops';
import { RoutesService } from '../shared/routepaths/routes.service';
import { Http } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { AccordionConfig } from 'ng2-bootstrap';

declare var google:any;

//Accordion configuration
export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), {closeOthers: true});
}

@Component({
  moduleId: module.id,
  selector: 'routes-component',
  templateUrl: 'routes.component.html',
  providers: [ RoutesService, {provide: AccordionConfig, useFactory: getAccordionConfig} ],
})

export class RoutesComponent implements OnInit{

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pathModal') pathModal: ElementRef;

  map: any;
  routes:any;
  stops:any;
  buslocation:any;
  locationMarkers:any;
  busMarkers:any;
  polylinePaths:any;
  tempRoute:any;
  alerts: any = [];
  busIcon = {
    url: 'https://maps.google.com/mapfiles/kml/shapes/bus.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(64, 64),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 0)
  };

  //Modal window Values
  m_title: any = '';
  m_body: any = '';
  m_desc: any = '';

  //route id from selected route
  r_id: any;

  //stop and route from selected stop in modal
  @Input() m_stop: Stops;
  @Input() m_route: Routes;

  isCollapsed:boolean = true;
  timeout:number = 3000;

  mname: FormControl;
  mdescription: FormControl;
  mlatitude: FormControl;
  mlongitude: FormControl;
  mroutename: FormControl;
  mroutedesc: FormControl;

  constructor (private service: RoutesService){}

  ngOnInit(){
    //checkInternet connection
    this.loadMap();
    this.routes=[];
    this.buslocation=[];
    this.polylinePaths=[];
    this.locationMarkers=[];
    this.busMarkers=[];
    this.stops=[];
    this.greyFix();
    this.mname = new FormControl('', [Validators.required]);
    this.mdescription = new FormControl('', [Validators.required]);
    this.mlongitude = new FormControl('', [Validators.required]);
    this.mlatitude = new FormControl('', [Validators.required]);
    this.mroutename = new FormControl('', [Validators.required]);
    this.mroutedesc = new FormControl('', [Validators.required]);
    this.getBus(this);
  }

  getBus(that:any){
    setInterval(function(){that.getBusLocation()}, 4000);
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


  //Google maps grey fix when changing tabs
  greyFix(){
    //bug fix for grey map
    $('#map').css('height', '99%').css( 'width', '99%');
    $('#map').css('height', '100%').css( 'width', '100%');
  }

  //set modal route and title
  setMTitle(title:any, route: any){
    if(title !== ''){
      this.m_route =
      new Routes(route.route_id, route.color, route.route_name, route.route_description, route.route_area, route.route_status, []);
    }
    else{
      this.m_route = new Routes(null, '', '', '', '', '', []);
    }
    this.m_title = title;
  }

  setButtonText(b_id:any, text:any){
    $('#'+b_id).html(text);
  }

  getMTitle(){
    return this.m_title;
  }

  setRoute(r_id:any){
    this.setEmptyStop();
    this.r_id = r_id;
    this.getRoute(r_id);
    this.getStopsFromRoute(r_id);
  }

  setEmptyStop(){
    this.m_stop = new Stops(null, null, '', '', null, null, '');
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
    if(this.m_title !== ''){
      $('#pathModal').modal('show');
    }
  }

  openRouteModal(){
    if(this.m_title !== ''){
      $('#routeModal').modal('show');
    }
  }

  onModalClose(){
    $('#pathModal').on('hidden.bs.modal', () => {
    console.log('inside hide modal function');
    })
  }

  //scroll fix for nested modals
  focusModal(){
    $(document).on('hidden.bs.modal', '.modal', function () {
      $('.modal:visible').length && $(document.body).addClass('modal-open');
    });
  }

  closeModal(modal_name:string){
    $('#' + modal_name).modal('hide');
  }

  successAlert(message:string): void {
    this.alerts.push({
      type: 'success',
      msg: message,
      timeout: 3000
    });
  }

  errorAlert(message:string): void {
    this.alerts.push({
      type: 'warning',
      msg: message,
      timeout: 3000
    });
  }

  updateOrderShow(){
      $('#update-stop-order').modal('show');
  }

  updateStopOrder(){
    var newOrder = [];
    for (var i = 0; i < this.locationMarkers.length; i++) {
      newOrder.push({id: this.locationMarkers[i].stop_id, order: i});
      if(newOrder.length === this.locationMarkers.length){
        this.service.updateOrder(newOrder)
        .subscribe(() => {
        this.getStopsFromRoute(this.r_id)});
        this.successAlert('Stop Order Successfully Updated');
      }
    }
  }

  editStop(){
    this.service.update(this.m_stop)
    .subscribe(() => {
    this.getStopsFromRoute(this.r_id)});
    this.successAlert('Stop Updated');
    this.setEmptyStop();
    this.isCollapsed = true;
  }

  deleteStop(){
    $('#confirm-delete').modal('hide');
    this.service.delete(this.m_stop.stop_id, this.r_id)
    .subscribe(() => {
      this.getStopsFromRoute(this.r_id);
      this.setEmptyStop();
      this.errorAlert('Stop Deleted');
    });
  }

  confirmDelete(){
    $('#confirm-delete').modal('show');
  }

  addStop(){
    this.service.create(this.m_stop, this.r_id)
    .subscribe(() => {
      this.getStopsFromRoute(this.r_id)});
      this.setEmptyStop();
      this.successAlert("Stop successfully added");
      this.isCollapsed = true;
  }

  updateRoute(){
    $('#routeModal').modal('hide');
    this.service.updateRoute(this.m_route)
    .subscribe(() =>{
      this.getRoutes();
      this.setButtonText('routeDisplay', 'Select Route');
      this.m_title = '';
      this.successAlert('Route successfully updated');
    });
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

  clearBusLocations(){
    this.busMarkers.forEach((b:any) => {
      b.setMap(null);
    });
    this.busMarkers = [];
  }

  getRoutes(){
    this.service.getPaths()
    .subscribe(routes => {
      this.clearPolylines();
      this.clearMarkers();
      this.routes = routes;
      this.loadRoutes();
    })
  }

  getBusLocation(){
    this.service.getBusLocation()
    .subscribe(busLocation => {
      this.buslocation = busLocation;
      this.loadBusLocation();
    })
  }

  getRoute(r_id: any){
      this.loadRoute(r_id);
  }

  loadBusLocation(){
    this.clearBusLocations();
    for(var i=0;i<this.buslocation.length;i++){
      var bus=this.buslocation[i];
      var latlng = new google.maps.LatLng(bus.gps_latitude, bus.gps_longitude);
      let bus_marker = new google.maps.Marker({
        map: this.map,
        position: latlng,
        name: bus.bus_name,
        status: bus.bus_status,
        latitude: bus.gps_latitude,
        longitude: bus.gps_longitude,
        icon: this.busIcon
      });
      //info window content
      let content='<h5>'+bus_marker.name+'</h5><p>Status: ' + bus_marker.status + '</p>';
      this.addInfoWindow(bus_marker,content);
      this.busMarkers.push(bus_marker);
    }
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
          strokeWeight: 7,
          id: route.route_id,
          name: route.route_name,
          color: route.color_name,
          description: route.route_description,
          area: route.route_area,
        });
        this.polylinePaths.push(polyline);
        let content= '<h4>'+route.route_name+'</h4><p>'+route.route_description+'</p>';
        this.addInfoWindowRoutes(polyline,content);
      }
    this.map.setZoom(15);
    this.map.setCenter(new google.maps.LatLng(18.2013257,-67.1392801));
  }

  loadRoute(r_id:any){
  this.clearPolylines();
  var bounds = new google.maps.LatLngBounds();
  for(var i=0;i<this.routes.length;i++){
    if(r_id === this.routes[i].route_id){
      var route=this.routes[i];
      var polyline = new google.maps.Polyline({
        map: this.map,
        path: route.route_path,
        path_id: route.path_id,
        strokeColor: route.color,
        strokeOpacity: 1.0,
        strokeWeight: 7,
        id: route.route_id,
        name: route.route_name,
        color: route.color_name,
        description: route.route_description,
        area: route.route_area,
      });
      polyline.getPath().forEach(function(e:any){//can't do polyline.getPath()[i] because it's a MVCArray
          bounds.extend(e);
      })
      this.map.fitBounds(bounds);
      this.polylinePaths.push(polyline);
    }
    }
  }

  getStopsFromRoute(r_id: any){
      this.service.getStopsFromRoute(r_id)
      .subscribe(stops => {
        this.stops = stops;
        this.loadStops();
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
      let content='<h4>'+stop_marker.name+'</h4><p>'+stop_marker.description+'</p>';
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

  addInfoWindowRoutes(item:any, content:any){

  let infowindow = new google.maps.InfoWindow({
    content: content
  });
  google.maps.event.addListener(item, 'mouseover', function(latlng:any) {
      let path = item.getPath();
      var polyline = new google.maps.Polyline({
          map: this.map,
          path: path,
          strokeColor: '#42f4d9',
          strokeOpacity: 1.0,
          strokeWeight: 12
        });
      this.tempRoute=polyline;
  });

  google.maps.event.addListener(item, 'mouseout', function(latlng:any) {
      if(this.tempRoute!=undefined){
        this.tempRoute.setMap(null);
      }
  });
  google.maps.event.addListener(item, 'click', (event:any) => {

   if(!item.open){
                infowindow.setPosition(event.latLng)
                infowindow.open(this.map,item);
                item.open = true;
  }
  else {
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
