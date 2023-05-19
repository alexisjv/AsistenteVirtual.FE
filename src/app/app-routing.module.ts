import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalizarListaComponent } from './pages/personalizar-lista/personalizar-lista.component';
import { FormularioEventoComponent } from './pages/formulario-evento/formulario-evento.component';
import { HomeLandingComponent } from './pages/home-landing/home-landing.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';


const routes: Routes = [
  { path: 'personalizarLista/:idEvento/:localidad', component: PersonalizarListaComponent },
  { path: 'consultar-evento', component: FormularioEventoComponent },
  {path: '', component: HomeLandingComponent},
  {path: 'registro', component: FormRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
