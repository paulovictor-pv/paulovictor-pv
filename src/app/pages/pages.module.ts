import { ParticipacaoModule } from './grupos/participacao/participacao.module';
import { GruposCriadosModule } from './grupos/gruposCriados/gruposCriados.module';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GruposModule } from './grupos/grupos.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { EditarPerfilModule } from './editarperfil/editarperfil.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    GruposModule,
    ParticipacaoModule,
    ConfiguracoesModule,
    MiscellaneousModule,
    GruposCriadosModule,
    EditarPerfilModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
