import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { Evento } from '../models/evento';
import { Localidad } from '../models/localidad';
import { Comidas } from '../models/comidas';
import { Bebidas } from '../models/bebidas';

@Injectable({
  providedIn: 'root'
})

export class ListaComprasService {

  apiUrl = 'https://localhost:7292/api/';

  constructor(private http: HttpClient, private router: Router) { }

  //Metodos de las preguntas
  getListaEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiUrl + 'evento/eventos');
  }

  getListaTiposDeComidas(idEvento: number): Observable<Comidas[]> {
    return this.http.get<Comidas[]>(this.apiUrl + `Evento/comidas/${idEvento}`);
  }

   getListaBebidas(idEvento: number): Observable<Bebidas[]> {
    return this.http.get<Bebidas[]>(this.apiUrl + `Evento/bebidas/${idEvento}`);
  }

  getLocalidades () : Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.apiUrl + `Ubicacion/localidades`);
  }

//Metodos de escenarios finales
 
  getListaProductosPorCriterio(criterio): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + 'obtenerStock');
  }

  getListaProductosPorEventoYLocalidad(idEvento: number, localidad: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + `oferta/ofertasPorLocalidad/${idEvento}/${localidad}`);
  }

  getListaProductosEconomicos(idEvento: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + `oferta/ofertasMasEconomicas/${idEvento}`);
  }

  
}