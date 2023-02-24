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

  criarPessoa(form: NgForm){
    this.pessoa = form.value;
    this.pessoaService.savePessoa(this.pessoa).subscribe((pessoa: Pessoa)=>{
      this.toastrService.show(
        'Pessoa registrada!',
        'Sucesso!',
        {status: 'success'});
        form.reset();
    },(err) => {
      this.toastrService.show(
        'Problema ao registrar a Pessoa!',
        'Ops!',
        {status: 'danger'});
      });

  }
}
