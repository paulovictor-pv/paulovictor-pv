import { Utils } from './../miscellaneous/Utils/utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PessoaService } from './../../services/pessoa.service';
import {Component, OnInit} from '@angular/core';

import { NbToastrService } from '@nebular/theme';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./editarperfil.component.scss'],
  templateUrl: './editarperfil.component.html',
})

export class EditarPerfilComponent implements OnInit{

  constructor(
    private pessoaService: PessoaService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
  ){
  }

  pessoa:any;
  pessoas: Pessoa[];
  formulario: FormGroup;

  ngOnInit(){
    this.createFormGroup();
    this.setPessoa();

  }

  onSubmit(){
    this.pessoaService.updatePessoa(this.formulario.value).subscribe((pessoa: Pessoa)=>{
      this.toastrService.show(
        'Perfil Atualizado!',
        'Sucesso!',
        {status: 'success'});
        Utils.attPessoaoLogado(pessoa);
    },(err) => {
      this.toastrService.show(
        'Problema ao registrar Comissão!',
        'Ops!',
        {status: 'danger'});
    });

    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  setPessoa(){
    this.pessoa = Utils.getSessionPessoa();
    this.patchValueForm(this.pessoa, this.formulario);
  }

  private patchValueForm(obj: any, formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      if (obj[key]) {
        formGroup.controls[key].patchValue(obj[key]);
      }
    });
  }

  createFormGroup(){
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null],
      email: [null],
      telefone: [null],
      cpf: [null],
    });
  }
}
