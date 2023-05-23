import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ListaComprasService } from 'src/app/services/lista-compras.servicio';
import { Observable, map } from 'rxjs';
import { VariantesModalComponent } from 'src/app/components/variantes-modal/variantes-modal.component';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute } from '@angular/router';
import { MejorRutaComponent } from 'src/app/components/mejor-ruta/mejor-ruta.component';
import { Oferta } from 'src/app/models/oferta';
import { Evento } from 'src/app/models/evento';


@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss']
})
export class OptimizadorListaComponent implements OnInit{

  modalRef: MdbModalRef<VariantesModalComponent> | null = null;
  listaEconomicaSeleccionada = false;
  menosRecorridoSeleccionado = false;
  listaOfertaMenorRecorrido: Oferta[];
  listaOfertaEconomicos: Oferta[];
  idEvento: number;
  localidad: string;
  distanciaEconomico: string;
  distanciaMenosRecorrido: string;
  mejorRutaComponent: MejorRutaComponent = new MejorRutaComponent();
  cantidadComerciosEconomico: number;
  cantidadComerciosMenosRecorrido: number;
  listaLocalidadesSeleccionadas: string[];
  idComida: number;
  idBebida: number;
  listaSeleccionada: boolean;
  nombreEvento: string;
  resumen = false;
  escenarios = true;


  constructor(private modalService: MdbModalService, private listaCompraService: ListaComprasService, private router: ActivatedRoute ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.idComida = parseInt(params['idComida']);
      this.idBebida = parseInt(params['idBebida']);
      this.idEvento = parseInt(params['idEvento']);
      const idLocalidadesSeleccionadas = JSON.parse(params['idLocalidadesSeleccionadas']);
      this.listaLocalidadesSeleccionadas = idLocalidadesSeleccionadas

      
      
    this.getListaOfertasMenorRecorrido(parseInt(idLocalidadesSeleccionadas[0]), this.idComida, this.idBebida);
    this.getListaOfertasEconomicas();
    this.getNombreEvento(this.idEvento);
    })
  }

  openModal() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }
  openModalAdd() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }

  getListaOfertasMenorRecorrido(idLocalidad: number, idComida: number, idBebida: number) {
  
    this.listaCompraService.getListaOfertasMenorRecorrido(idLocalidad, idComida, idBebida).subscribe(
      (listaOfertas: Oferta[]) => {
        this.listaOfertaMenorRecorrido = listaOfertas;
        console.log('Ofertas menor recorrido' + this.listaOfertaMenorRecorrido);
      },
      (error) => console.error(error)
    );
  }

  getListaOfertasEconomicas() {
    const listaLocalidadesNumeros = this.listaLocalidadesSeleccionadas.map(localidad => parseInt(localidad, 10));

    this.listaCompraService.postListaOfertasEconomicas(listaLocalidadesNumeros, this.idComida, this.idBebida).subscribe(
      (listaOfertas: Oferta[]) => {
        this.listaOfertaEconomicos = listaOfertas;
        console.log('Ofertas economicas' + this.listaOfertaEconomicos);
      },
      (error) => console.error(error)
    );
  }

  getNombreEvento(idEvento: number): void {
    this.listaCompraService.getListaEventos().subscribe((eventos: Evento[]) => {
      const eventoEncontrado = eventos.find(evento => evento.id === idEvento);
      this.nombreEvento = eventoEncontrado ? eventoEncontrado.nombre : '';
    });
  }
  
  

  /* optimizar(critero: string) {
    this.listaCompraService.getListaProductosPorCriterio(critero).subscribe(
      (listaProductos: Producto[]) => {
        this.
        listaProductos = listaProductos;
      },
      (error) => console.error(error)
    );
  } */

/*   getListaEconomica(idEvento){

    this.listaCompraService.getListaProductosEconomicos(idEvento).subscribe(
      (listaProductos: Producto[]) => {
        this.
        listaProductos = listaProductos;
        console.log(listaProductos);
      },
      (error) => console.error(error)
    );
  } */

  public seleccionarListaEconomica() {
    this.listaEconomicaSeleccionada = true;
    this.menosRecorridoSeleccionado = false;
    this.listaSeleccionada = this.listaEconomicaSeleccionada;
    const comerciosVisitados = new Set<string>();
    const waypoints = [];
  
    const miUbicacionActual = [-34.67058109744653, -58.56281593172098];
    waypoints.push({ location: `${miUbicacionActual[0]}, ${miUbicacionActual[1]}` });
  
    for (const oferta of this.listaOfertaEconomicos) {
      if (!comerciosVisitados.has(oferta.nombreComercio)) {
        waypoints.push({
          location: `${oferta.latitud}, ${oferta.longitud}`
        });
        comerciosVisitados.add(oferta.nombreComercio);
      }
    }
  
    this.cantidadComerciosEconomico = waypoints.length - 1;
  
    this.mejorRutaComponent.calculateAndDisplayRoute(waypoints, (distance) => {
      console.log('Distancia recibida:', distance);
      this.distanciaEconomico = distance;
    });
  }
  
  
  public seleccionarMenosRecorrido() {
    this.listaEconomicaSeleccionada = false;
    this.menosRecorridoSeleccionado = true;
    this.listaSeleccionada = this.menosRecorridoSeleccionado;
    const waypoints = this.listaOfertaMenorRecorrido.map(oferta => ({
      location: `${oferta.latitud}, ${oferta.longitud}`
    }));
    const miUbicacionActual = [-34.67058109744653, -58.56281593172098];
    waypoints.push({ location: `${miUbicacionActual[0]}, ${miUbicacionActual[1]}` });
    this.cantidadComerciosEconomico = waypoints.length - 1;

    this.mejorRutaComponent.calculateAndDisplayRoute(waypoints, (distance) => {
      console.log('Distancia recibida:', distance);
      this.distanciaMenosRecorrido = distance;
    });
  }
  
  public shareMap() {
    this.mejorRutaComponent.shareMap();
  }

  groupOffersByCommerceName(offers: Oferta[]): Oferta[][] {
    const groupedOffers: Oferta[][] = [];
    
    offers.forEach((offer) => {
      const existingGroup = groupedOffers.find((group) => group[0].nombreComercio === offer.nombreComercio);
      
      if (existingGroup) {
        existingGroup.push(offer);
      } else {
        groupedOffers.push([offer]);
      }
    });
    
    return groupedOffers;
  }

  obtenerResumen(){
    this.escenarios = false;
    this.resumen = true;
  }
  
}
