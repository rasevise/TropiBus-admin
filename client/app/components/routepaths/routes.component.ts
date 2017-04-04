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
  tempRoute:any;
  locationMarkers:any;
  polylinePaths:any;

  //Modal Values
  m_title: any = '';
  m_body: any;
  m_desc: any;
  m_route: any;
  m_stop: any;

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
  }
  
  //JQuery Functions for boottrap functionality
  dropdownClick(){
    $('#routeSelectButton').dropdown();
  }

  openPathModal(){
    if(this.m_title != ''){
      $('#pathModal').modal('show');
    }
  }

  setButtonText(b_id:any, text:any){
    $('#'+b_id).html(text);
  }

  setRoute(r_id:any){
    this.polylinePaths.forEach(p => {//warning, not an error
      p.setMap(null);
    });
    for (var i = 0; i < this.locationMarkers.length; i++) {
      this.locationMarkers[i].setMap(null);
    }
    this.loadRoute(r_id);
    this.getStops(r_id);
  }

  editStop(stop:any){
    this.m_stop = stop;
    this.m_stop.latitude = stop.latitude;
    this.m_stop.longitude = stop.longitude;
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  loadMap(){

  //Geolocation.getCurrentPosition().then((myposition) => {
    let latLng = new google.maps.LatLng(18.2013257,-67.1392801);
    console.log(latLng);
    
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.trigger(this.map, 'resize');
    this.getRoutes();
    // this.getStops(r_id);
  }
  getRoutes(){
    this.service.getPaths()
    .subscribe(routes => {
        this.routes = routes;
        this.loadRoutes();
        console.log(routes);
    })
  }
  getStops(r_id:any){
    this.service.getStops().subscribe(stops => {
        this.stops = stops;
        this.loadStops(r_id);
        console.log(stops);
  })
}

  loadRoutes(){

    for(var i=0;i<this.routes.length;i++){
        var route=this.routes[i];
        var polyline = new google.maps.Polyline({
            map: this.map,
            path: route.path,
            strokeColor: route.color,
            strokeOpacity: 1.0,
            strokeWeight: 4,
            id: route.route_ID,
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
      if(r_id === this.routes[i].route_ID){
        var route=this.routes[i];
        var polyline = new google.maps.Polyline({
            map: this.map,
            path: route.path,
            strokeColor: route.color,
            strokeOpacity: 1.0,
            strokeWeight: 4,
            id: route.route_ID,
            name: route.route_name,
            color: route.color_name,
            description: route.route_description,
            area: route.route_area,
        });
        this.polylinePaths.push(polyline);
      }
      }
  }
  
  loadStops(r_id:any){
    for(var i=0;i<this.stops.length;i++){
      if(r_id === this.stops[i].route_ID){
      var stop=this.stops[i];
      var latlng = new google.maps.LatLng(stop.stop_latitude, stop.stop_longitude);
      let stop_marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latlng,
        id: stop.route_ID,
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

// addInfoWindowRoutes(item:any, content:any){
 
//   let infowindow = new google.maps.InfoWindow({
//     content: content
//   });
//   google.maps.event.addListener(item, 'mouseover', function(latlng:any) {
//             let path = item.getPath();
//             var polyline = new google.maps.Polyline({
//                 map: this.map,
//                 path: path,
//                 strokeColor: "#42f4d9",
//                 strokeOpacity: 1.0,
//                 strokeWeight: 7
//               });
//             this.tempRoute=polyline;
//         // let content= "<h4>"+route.route_name+"</h4><p>"+route.route_description+"</p>"
//         // this.addInfoWindowRoutes(polyline,content)
//   });

//   google.maps.event.addListener(item, 'mouseout', function(latlng:any) {
//             if(this.tempRoute!=undefined){
//               this.tempRoute.setMap(null);
//             }
//   });
//   google.maps.event.addListener(item, 'click', (event:any) => {
//       this.m_title = item.name;
//       $('#pathModal').find('.modal-title').text('Route: ' + this.m_title);
//       $('#pathModal').modal('show').on('shown.bs.modal', function (e: any) {
//         //do something
//       })
      
//   });
// }

}