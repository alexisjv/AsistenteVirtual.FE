import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VariantesModalComponent } from '../variantes-modal/variantes-modal.component';


@Component({
  selector: 'app-personalizar-lista',
  templateUrl: './personalizar-lista.component.html',
  styleUrls: ['./personalizar-lista.component.scss']
})
export class PersonalizarListaComponent {

  modalRef: MdbModalRef<VariantesModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }
  openModalAdd() {
    this.modalRef = this.modalService.open(VariantesModalComponent)
  }
}
