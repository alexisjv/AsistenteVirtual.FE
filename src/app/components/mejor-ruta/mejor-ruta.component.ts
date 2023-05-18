import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-mejor-ruta',
  templateUrl: './mejor-ruta.component.html',
  styleUrls: ['./mejor-ruta.component.scss']
})
export class MejorRutaComponent implements OnInit {
  
  map: any;
  directionsService: any;
  directionsRenderer: any;
  waypoints: any[] = [
    { location: '-34.653675403322524, -58.53804308530392' },
    { location: '-34.64810450281431, -58.54866897951402' },
    { location: '-34.63816815647607, -58.535893427604826' }
  ];

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    
    const mapOptions = {
      center: new google.maps.LatLng(-34.66127595189962, -58.55017174521541),
      zoom: 10
    };
    
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsRenderer.setMap(this.map);
    
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    const origin = this.waypoints[0].location;
    const destination = this.waypoints[this.waypoints.length - 1].location;
    const waypoints = this.waypoints.slice(1, this.waypoints.length - 1).map(waypoint => {
      return {
        location: waypoint.location,
        stopover: true
      };
    });

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    };

    this.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
      } else {
        window.alert('No se pudo calcular la ruta. Error: ' + status);
      }
    });
  }

}
