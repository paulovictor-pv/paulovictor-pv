import { NgForm } from '@angular/forms';
import { PessoaService } from './../../services/pessoa.service';
import {Component} from '@angular/core';

import { NbToastrService } from '@nebular/theme';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./configuracoes.component.scss'],
  templateUrl: './configuracoes.component.html',
})

export class ConfiguracoesComponent{

  constructor(
    private pessoaService: PessoaService,
    private toastrService: NbToastrService,
  ){
  }

  pessoa = {} as Pessoa;

  criarPessoa(pessoa){
  this.pessoaService.savePessoa(pessoa).subscribe((pessoa: Pessoa)=>{
    this.toastrService.show(
      'Pessoa registrada!',
      'Sucesso!',
      {status: 'success'});
  },(err) => {
    this.toastrService.show(
      'Problema ao registrar Oportunidade!',
      'Ops!',
      {status: 'danger'});
    });

    setTimeout(function () {
      window.location.reload();
    }, 2000);

  }

  savePessoa(form: NgForm){
    this.pessoa = form.value;
    this.criarPessoa(this.pessoa);
  }
}
