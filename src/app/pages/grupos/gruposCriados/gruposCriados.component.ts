import { GrupoService } from './../../../services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../../models/grupo';
import { Utils } from '../../miscellaneous/Utils/utils';
import { Pessoa } from '../../../models/pessoa';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./gruposCriados.component.scss'],
  templateUrl: './gruposCriados.component.html',
})
export class GruposCriadosComponent implements OnInit{

  constructor(
    private grupoService: GrupoService,
  ){

  }
  academicos: any;
  grupo: Grupo[] = [];
  pessoa: Pessoa = Utils.getSessionPessoa();


  ngOnInit(){
    this.getGrupos();
  }

  getGrupos(){
    this.grupoService.getGrupos().subscribe((grupos:Grupo[])=>{
      for(let i=0;i<grupos.length;i++){
        if(this.pessoa.id === grupos[i].criador.id){
          this.grupo.push(grupos[i]);
        }
      }
    });
  }

  openEditarGrupo(idGrupo) {
    localStorage.setItem('idGrupoRemover',idGrupo);
    // this.windowService.open(EditarGrupoComponent, { title: `Editar Grupo` });
  }

  openRemoverGrupo(idGrupo){
    localStorage.setItem('idGrupoRemover',idGrupo);
    // this.windowService.open(RemoverGrupoComponent, { title: `Remover Grupo` });
  }
}
