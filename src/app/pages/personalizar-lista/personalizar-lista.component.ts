import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VariantesModalComponent } from '../../components/variantes-modal/variantes-modal.component';
import { EventoProducto } from 'src/app/models/evento-producto';
import { ListaComprasService } from 'src/app/services/lista-compras.servicio';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-personalizar-lista',
  templateUrl: './personalizar-lista.component.html',
  styleUrls: ['./personalizar-lista.component.scss']
})
export class PersonalizarListaComponent implements OnInit{

  modalRef: MdbModalRef<VariantesModalComponent> | null = null;

  listaProductos: Observable<EventoProducto[]>;

  constructor(private modalService: MdbModalService, private listaCompraService: ListaComprasService ) {}

  ngOnInit(): void {
    this.getListaProductos();
  }

  openModal() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }
  openModalAdd() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }

  getListaProductos(){
    this.listaProductos = this.listaCompraService.getListaProductos();
  }

  optimizar(critero: string) {
    this.listaProductos = this.listaCompraService.getListaProductosPorCriterio(critero);
  }
}
