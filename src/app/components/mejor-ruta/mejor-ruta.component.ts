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
  comercios: any[] = [
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
    
  }

  calculateAndDisplayRoute(comercios: any[], callback: (distance: string) => void) {
    this.comercios = comercios;
    const origin = this.comercios[0].location;
    const destination = this.comercios[this.comercios.length - 1].location;
    const waypoints = this.comercios
      .slice(1, this.comercios.length - 1)
      .map((waypoint) => {
        return {
          location: waypoint.location,
          stopover: true,
        };
      });

      this.initMap(); // Mueve esta línea aquí


    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
    };

    this.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            if (status === 'OK') {
              const distance = response.rows[0].elements[0].distance.text;
              console.log('Distancia del recorrido:', distance);
              callback(distance); // Llamar a la función de callback con el valor de distance
            } else {
              console.error('No se pudo calcular la distancia. Error:', status);
            }
          }
        );
        console.log(comercios);
        console.log(destination);
      } else {
        window.alert('No se pudo calcular la ruta. Error: ' + status);
      }
    });
  }
  
  shareMap() {
    const origin = this.comercios[0].location;
    const destination = this.comercios[this.comercios.length - 1].location;
    const waypoints = this.comercios.slice(1, this.comercios.length - 1).map(waypoint => {
      return {
        location: waypoint.location,
        stopover: true
      };
    });
  
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const encodedWaypoints = waypoints.map(waypoint => encodeURIComponent(waypoint.location));
  
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&waypoints=${encodedWaypoints.join('%7C')}`;
  
    const whatsappMessage = `¡Hola! Aquí está la mejor ruta para llegar a mi destino: ${mapUrl}`;
  
    // Crea un enlace para compartir en WhatsApp Web
    const whatsappWebLink = `https://web.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
  
    // Abre WhatsApp Web en una nueva pestaña
    window.open(whatsappWebLink, '_blank');
  
    // Abre el recorrido en la aplicación Google Maps en el celular
    const googleMapsAppLink = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&waypoints=${encodedWaypoints.join('%7C')}&dirflg=d`;
    window.open(googleMapsAppLink);
  }

  obtenerLinkGps(): string {
    const origin = this.comercios[0].location;
    const destination = this.comercios[this.comercios.length - 1].location;
    const waypoints = this.comercios.slice(1, this.comercios.length - 1).map(waypoint => {
      return {
        location: waypoint.location,
        stopover: true
      };
    });
  
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const encodedWaypoints = waypoints.map(waypoint => encodeURIComponent(waypoint.location));
  
  
    // Abre el recorrido en la aplicación Google Maps en el celular
    const googleMapsAppLink = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&waypoints=${encodedWaypoints.join('%7C')}&dirflg=d`;
    
    return googleMapsAppLink;
  }
  
  
  
  
  
  

}
