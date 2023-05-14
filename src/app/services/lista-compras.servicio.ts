import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoProducto } from '../models/evento-producto';

@Injectable({
  providedIn: 'root'
})

export class ListaComprasService {

  apiUrl = 'https://localhost:7201/api/';

  constructor(private http: HttpClient) { }

  getListaProductos(): Observable<EventoProducto[]> {
    return this.http.get<EventoProducto[]>(this.apiUrl + 'comprasComunitarias');
  }

  getListaProductosPorCriterio(criterio): Observable<EventoProducto[]> {
    return this.http.get<EventoProducto[]>(this.apiUrl + 'obtenerStock');
  }
}