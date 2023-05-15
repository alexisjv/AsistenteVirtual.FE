import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ListaComprasService } from 'src/app/services/lista-compras.servicio';
import { Observable } from 'rxjs';
import { VariantesModalComponent } from 'src/app/components/variantes-modal/variantes-modal.component';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-personalizar-lista',
  templateUrl: './personalizar-lista.component.html',
  styleUrls: ['./personalizar-lista.component.scss']
})
export class PersonalizarListaComponent implements OnInit{

  modalRef: MdbModalRef<VariantesModalComponent> | null = null;

  listaProductos: Producto[];
  idEvento: number;
  localidad: string;

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
}
