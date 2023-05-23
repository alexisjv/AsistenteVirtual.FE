import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ListaComprasService } from 'src/app/services/lista-compras.servicio';
import { Observable } from 'rxjs';
import { VariantesModalComponent } from 'src/app/components/variantes-modal/variantes-modal.component';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute } from '@angular/router';
import { MejorRutaComponent } from 'src/app/components/mejor-ruta/mejor-ruta.component';


@Component({
  selector: 'app-optimizador-lista',
  templateUrl: './optimizador-lista.component.html',
  styleUrls: ['./optimizador-lista.component.scss']
})
export class OptimizadorListaComponent implements OnInit{

  modalRef: MdbModalRef<VariantesModalComponent> | null = null;
  listaEconomicaSeleccionada = false;
  menosRecorridoSeleccionado = false;
  listaProductos: Producto[];
  idEvento: number;
  localidad: string;
  distanciaEconomico: string;
  distanciaMenosRecorrido: string;
  mejorRutaComponent: MejorRutaComponent = new MejorRutaComponent();
  cantidadComerciosEconomico: number;
  cantidadComerciosMenosRecorrido: number;


  constructor(private modalService: MdbModalService, private listaCompraService: ListaComprasService, private router: ActivatedRoute ) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.idEvento = +params['idEvento']; // Convierte el parámetro en número
      this.localidad = params['localidad'];
    });

    this.getListaProductos(this.idEvento, this.localidad);
  }

  openModal() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }
  openModalAdd() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }

  getListaProductos(idEvento, localidad){

    this.listaCompraService.getListaProductosPorEventoYLocalidad(idEvento, localidad).subscribe(
      (listaProductos: Producto[]) => {
        this.
        listaProductos = listaProductos;
        console.log(listaProductos);
      },
      (error) => console.error(error)
    );


  }

  optimizar(critero: string) {
    this.listaCompraService.getListaProductosPorCriterio(critero).subscribe(
      (listaProductos: Producto[]) => {
        this.
        listaProductos = listaProductos;
      },
      (error) => console.error(error)
    );
  }

  getListaEconomica(idEvento){

    this.listaCompraService.getListaProductosEconomicos(idEvento).subscribe(
      (listaProductos: Producto[]) => {
        this.
        listaProductos = listaProductos;
        console.log(listaProductos);
      },
      (error) => console.error(error)
    );
  }

  public seleccionarListaEconomica() {
    this.listaEconomicaSeleccionada = true;
    this.menosRecorridoSeleccionado = false;
    const waypoints = [
      { location: '-34.64076287570826, -58.52663429917829' },
      { location: '-34.665226346462504, -58.49556027255815' },
      { location: '-34.68793596093039, -58.54338514286108' },
      { location: '-34.640585407186904, -58.572505384567435'}
    ];

    this.cantidadComerciosEconomico = waypoints.length;
  
    this.mejorRutaComponent.calculateAndDisplayRoute(waypoints, (distance) => {
      console.log('Distancia recibida:', distance);
      this.distanciaEconomico = distance;
    });

  }
  
  public seleccionarMenosRecorrido() {
    this.listaEconomicaSeleccionada = false;
    this.menosRecorridoSeleccionado = true;
    const waypoints = [
      { location: '-34.657632889926404, -58.54647283036518' },
      { location: '-34.6658398845163, -58.543897909886084' },
      { location: '-34.658921353616, -58.557072919670816' }
    ];
    this.cantidadComerciosMenosRecorrido = waypoints.length;

    this.mejorRutaComponent.calculateAndDisplayRoute(waypoints, (distance) => {
      console.log('Distancia recibida:', distance);
      this.distanciaMenosRecorrido = distance;
    });
  }
  
  public shareMap() {
    this.mejorRutaComponent.shareMap();
  }
}
