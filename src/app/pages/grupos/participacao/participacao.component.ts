import { Utils } from './../../miscellaneous/Utils/utils';
import { Membro } from './../../../models/membro';
import { MembroService } from './../../../services/membro.service';
import { PessoaService } from './../../../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../../models/pessoa';
import { Grupo } from '../../../models/grupo';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./participacao.component.scss'],
  templateUrl: './participacao.component.html',
})

export class ParticipacaoComponent implements OnInit{

   constructor(
    private pessoaService: PessoaService,
    private membroService: MembroService,
  ) {
  }

  pag: Number = 1 ;
  contador: Number = 4;
  loading = false;
  active: boolean = false;
  pessoas: Pessoa[];
  membros: Membro[];
  grupos: Grupo[] = [];
  pessoaLogada = Utils.getSessionPessoa();

  ngOnInit(){
    this.getPessoa();
    this.getMembros();
  }

  getPessoa() {
      this.pessoaService.getPessoas().subscribe((pessoa: Pessoa[]) => {
        this.pessoas = pessoa;
      });
  }

  getMembros(){
    this.membroService.getMembros().subscribe((membro: Membro[])=>{
      this.membros = membro;
      for(let i=0;  i<this.membros.length; i++){
        if(this.membros[i].pessoa.id === this.pessoaLogada.id){
          this.grupos.push(this.membros[i].grupo);
          this.active = true;
        }
      }
    });
  }

}
