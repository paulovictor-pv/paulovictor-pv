import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GruposComponent } from './grupos/grupos.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { GruposCriadosComponent } from './grupos/gruposCriados/gruposCriados.component';
import { ParticipacaoComponent } from './grupos/participacao/participacao.component';
import { EditarPerfilComponent } from './editarperfil/editarperfil.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'grupos',
      component: GruposComponent,
    },
    {
      path: 'gruposCriados',
      component: GruposCriadosComponent,
    },
    {
      path: 'configuracoes',
      component: ConfiguracoesComponent,
    },
    {
      path: 'participacoes',
      component: ParticipacaoComponent,
    },
    {
      path: 'editarPerfil',
      component: EditarPerfilComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
