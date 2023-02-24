import { PessoaService } from './../../../services/pessoa.service';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { Pessoa } from '../../../models/pessoa';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class LoginComponent extends NbLoginComponent {
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
  pessoaLogada = {} as Pessoa;

  teste(){
    this.pessoaService.getPessoas().subscribe((pessoa: Pessoa[]) => {
      for(let i= 0 ; i < pessoa.length; i++){
        if(pessoa[i].email === this.user.email){
          sessionStorage.setItem('Pessoa_logada', JSON.stringify(pessoa[i]));
          this.router.navigate(['/pages/dashboard']);
          return;
        }
      }
      this.toastrService.show(
        'Usuário não encontrado na base de dados',
        'Ops!',
        {status: 'danger'});
    });
  }
}
