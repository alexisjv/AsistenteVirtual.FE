import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalizarListaComponent } from './pages/personalizar-lista/personalizar-lista.component';
import { FormularioEventoComponent } from './pages/formulario-evento/formulario-evento.component';

const routes: Routes = [
  { path: 'personalizarLista/:idEvento/:localidad', component: PersonalizarListaComponent },
  { path: '', component: FormularioEventoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
