import { PessoaService } from './../../../services/pessoa.service';

import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { Pessoa } from '../../../models/pessoa';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './registro.component.html',
})

export class RegistroComponent extends NbLoginComponent {
  constructor(
    private pessoaService: PessoaService,
    private toastrService: NbToastrService,
    nbAuthService: NbAuthService,
    cd: ChangeDetectorRef,
    @Inject(NB_AUTH_OPTIONS) options: {},
    router: Router
  ) {
    super(nbAuthService,options,cd,router);
  }


  teste(){
    this.pessoaService.savePessoa(this.user).subscribe((pessoa: Pessoa)=>{
      this.toastrService.show(
        'Usuário registrado na base de dados',
        'Sucesso!',
        {status: 'success'});
        //timer
        this.setDelay();
      },(err) => {
        this.toastrService.show(
          'Problema ao registrar Oportunidade!',
          'Ops!',
          {status: 'danger'});
      });
  }

  setDelay(){
    this.router.navigate(['/']);
    setTimeout(function () {
    }, 2000);
  }
}
