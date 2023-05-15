import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/models/evento';
import { Localidad } from 'src/app/models/localidad';
import { ListaComprasService } from 'src/app/services/lista-compras.servicio';

@Component({
  selector: 'app-formulario-evento',
  templateUrl: './formulario-evento.component.html',
  styleUrls: ['./formulario-evento.component.scss']
})
export class FormularioEventoComponent {
  idEventoSeleccionado: number;
  localidadSeleccionada: string;
  listaEventos: Evento[];
  mostrarOpcionSeleccionada: boolean = false;
  localidades: string[] = ['San Justo', 'Ramos Mejía']

  constructor(private listaComprasService: ListaComprasService, private router: Router ) {}

  ngOnInit(): void {
    this.getListaEventos();
  }

  getListaEventos() {
    this.listaComprasService.getListaEventos().subscribe(
      (listaEventos: Evento[]) => {
        this.
        listaEventos = listaEventos;
      },
      (error) => console.error(error)
    );
  }

  mostrarLocalidades(idEvento: number) {
    this.idEventoSeleccionado = idEvento;
    this.mostrarOpcionSeleccionada = true;

  }
  
  consultar(): void {
    console.log('ID del evento:', this.idEventoSeleccionado);
    console.log('Localidad seleccionada:', this.localidadSeleccionada);
    this.router.navigate(['/personalizarLista', this.idEventoSeleccionado, this.localidadSeleccionada]);
  }
}
