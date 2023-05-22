import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comidas } from 'src/app/models/comidas';
import { Bebidas } from 'src/app/models/bebidas';
import { Evento } from 'src/app/models/evento';
import { Localidad } from 'src/app/models/localidad';
import { ListaComprasService } from 'src/app/services/lista-compras.servicio';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-formulario-evento',
  templateUrl: './formulario-evento.component.html',
  styleUrls: ['./formulario-evento.component.scss']
})
export class FormularioEventoComponent {
  idEventoSeleccionado: number;
  localidadesSeleccionadas: string[];
  primeraLocalidad : string;
  segundaLocalidad: string;
  terceraLocalidad: string;
  idComidaSeleccionada : number;
  idBebidaSeleccionada:number;
  listaEventos: Evento[];
  mostrarOpcionSeleccionada: boolean = false;
  ListaDeLocalidades: Localidad[] ;
  tiposDeComidas: Comidas[];
  tiposDeBebidas: Bebidas[];
  mostrarPreguntaQueTipoDeEvento : boolean = true;
  mostrarPreguntaQueTipoDeComida : boolean = false;
  mostrarPreguntaQueTipoDeBebida : boolean = false;
  mostrarPreguntaQueZonas : boolean = false;
  mostrarListaDeProductos : boolean = false;
  img : string = "assets/images/asistente.png"
  mostrarQueCompraQueresRealizar: boolean = true;
  listaDeProductos:Producto[];

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

  getTiposDeComidas(idEvento : number){
    this.listaComprasService.getListaTiposDeComidas(idEvento).subscribe(
      (listaComidas: Comidas[]) => {
        this.tiposDeComidas = listaComidas;
      },
      (error) => console.error(error)
    );

  } 

  mostrarTiposDeComida (idEvento : number){
    this.getTiposDeComidas(idEvento);
    this.mostrarPreguntaQueTipoDeEvento = false;
    this.mostrarPreguntaQueTipoDeComida = true;
    if(idEvento === 1){
      this.img = "assets/images/asistente-cumpleaños.gif"; 
    }
    if(idEvento === 2){
      this.img = "assets/images/asistente-parrilla.gif";
    }
    this.idEventoSeleccionado = idEvento;
  }

  getTiposDeBebidas(){
    this.listaComprasService.getListaBebidas(this.idEventoSeleccionado).subscribe(
      (listaBebidas: Bebidas[]) => {
        this.tiposDeBebidas = listaBebidas;
      },
      (error) => console.error(error)
    );

  } 

  mostrarTiposDeBebida(idComida : number){
    this.getTiposDeBebidas();
    this.mostrarPreguntaQueTipoDeComida = false;
    this.mostrarPreguntaQueTipoDeBebida = true;
    this.idComidaSeleccionada = idComida;

  }
  
  mostrarLocalidades(idBebida: number) {
    this.mostrarPreguntaQueTipoDeBebida = false;
    this.mostrarOpcionSeleccionada = true;
    this.listaComprasService.getLocalidades().subscribe(
      (listaDeLocalidades: Localidad[]) => {
        this.ListaDeLocalidades = listaDeLocalidades;
      },
      (error) => console.error(error)
    );
    this.idBebidaSeleccionada = idBebida; 

  }
  
  consultar(): void {
    this.localidadesSeleccionadas =[ this.primeraLocalidad, this.segundaLocalidad, this.terceraLocalidad]
    console.log('ID del evento:', this.idEventoSeleccionado);
    console.log('Localidades' , this.localidadesSeleccionadas)
    // console.log('Localidad seleccionada:', this.localidadSeleccionada);
    // this.router.navigate(['/personalizarLista', this.idEventoSeleccionado, this.localidadSeleccionada]);
    this.router.navigate(['/personalizarLista'],  
    { queryParams:{ 
                    idEvento: this.idEventoSeleccionado, 
                    idComida: this.idComidaSeleccionada,
                    idBebida : this.idBebidaSeleccionada,
                    idLocalidadesSeleccionadas: this.localidadesSeleccionadas} });
    this.mostrarListaDeProductos = true;    
    this.mostrarOpcionSeleccionada=false
    this.mostrarQueCompraQueresRealizar = false;     
    this.listaDeProductos = [{
                      nombreProducto: 'Mayonesa',
                      marca:'Pepa',
                      imagen: 'img',
                      precio: 12,
                      nombreComercio: 'comercio',
                      },{
                        nombreProducto: 'Ketchup',
                        marca:'Pepa',
                        imagen: 'img',
                        precio: 12,
                        nombreComercio: 'comercio',
                        }]       
  }
}
