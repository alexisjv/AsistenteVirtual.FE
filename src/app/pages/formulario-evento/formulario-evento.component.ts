import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comidas } from 'src/app/models/comidas';
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
  localidades: string[] = ['San Justo', 'Ramos Mejía'];
  tiposDeComidas: Comidas[];
  mostrarPreguntaQueTipoDeEvento : boolean = true;
  mostrarPreguntaQueTipoDeComida : boolean = false;
  mostrarPreguntaQueTipoDeBebidas : boolean = false;
  mostrarPreguntaQueZonas : boolean = false;
  img : string = "assets/images/asistente.png"

  constructor(private listaComprasService: ListaComprasService, private router: Router ) {}

  ngOnInit(): void {
    this.getListaEventos();
  }

  getListaEventos() {
    // this.listaComprasService.getListaEventos().subscribe(
    //   (listaEventos: Evento[]) => {
    //     this.
    //     listaEventos = listaEventos;
    //   },
    //   (error) => console.error(error)
    // );
    this.listaEventos = [
    {
      id: 1,
      nombre: "Cumpleaños",
      estado: true
    },
    {
      id: 2,
      nombre: "Asado",
      estado: true,
    }

    ]
    
  }

  getTiposDeComidas(){

  } 

  mostrarTiposDeComida (idEvento : number){
    this.mostrarPreguntaQueTipoDeEvento = false;
    this.mostrarPreguntaQueTipoDeComida = true;
    if(idEvento == 1){
      this.img = "assets/images/asistente-cumpleaños.gif";
    }
    if(idEvento == 2){
      this.img = "assets/images/asistente-parrilla.gif";
    }
    

    
    // this.listaComprasService.getListaTiposDeComidas(idEvento);
    this.tiposDeComidas =[ {
      id: 1,
      nombre: "Hamburguesas",
      estado: true
    },
    {
      id: 2,
      nombre: "Panchos",
      estado: true,
    },
    {
      id: 2,
      nombre: "Pizzas",
      estado: true,
    },
    {
      id: 2,
      nombre: "Snacks",
      estado: true,
    },
    {
      id: 2,
      nombre: "Hamburguesas veggies",
      estado: true,
    }

    ]
  
    
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
