import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptimizadorListaComponent } from './pages/optimizador-lista/optimizador-lista.component';
import { FormularioEventoComponent } from './pages/formulario-evento/formulario-evento.component';
import { HomeLandingComponent } from './pages/home-landing/home-landing.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';


const routes: Routes = [
  { path: 'optimizadorLista', component: OptimizadorListaComponent },
  { path: 'consultar-evento', component: FormularioEventoComponent },
  {path: '', component: HomeLandingComponent},
  {path: 'registro', component: FormRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
