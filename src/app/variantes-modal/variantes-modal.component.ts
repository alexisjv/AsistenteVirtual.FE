import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-variantes-modal',
  templateUrl: './variantes-modal.component.html',
  styleUrls: ['./variantes-modal.component.scss']
})
export class VariantesModalComponent {
  constructor(public modalRef: MdbModalRef<VariantesModalComponent>) {}
}
