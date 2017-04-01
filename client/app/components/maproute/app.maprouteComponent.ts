import { Component } from '@angular/core';

@Component({
  selector: 'maproute',
  templateUrl: './app/components/maproute/maproute.html',
})
export class maprouteComponent  {

  stops: any[] = [];

  addStop(event: any) {
    if (event instanceof MouseEvent)
        return;
    this.stops.push(event.latLng);
    event.target.panTo(event.latLng);
}
}
