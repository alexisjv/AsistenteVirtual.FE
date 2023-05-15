import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})

export class ListaComprasService {

  apiUrl = 'https://localhost:7292/api/';

  constructor(private http: HttpClient, private router: Router) { }

  getListaEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiUrl + 'evento/eventos');

  }

  getListaProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + 'comprasComunitarias');
  }

  getListaProductosPorCriterio(criterio): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + 'obtenerStock');
  }

  getListaProductosPorEventoYLocalidad(idEvento: number, localidad: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + `oferta/ofertasPorLocalidad/${idEvento}/${localidad}`);
  }
}