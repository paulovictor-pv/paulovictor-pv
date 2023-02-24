import { MembroService } from './../../services/membro.service';
import { PessoaService } from './../../services/pessoa.service';
import { Pessoa } from './../../models/pessoa';
import { GrupoGeralService } from './../../services/grupoGeral.service';
import { GrupoEstudoService } from './../../services/grupoEstudo.service';
import { ComissaoService } from './../../services/comissao.service';
import { Utils } from './../miscellaneous/Utils/utils';
import { GrupoService } from './../../services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Grupo } from '../../models/grupo';
import { Comissao } from '../../models/comissao';
import { Comite } from '../../models/comite';
import { GrupoEstudo } from '../../models/grupoEstudo';
import { GrupoGeral } from '../../models/grupoGeral';
import { ComiteService } from '../../services/comite.service';
import { NbToastrService } from '@nebular/theme';
import { Membro } from '../../models/membro';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./grupos.component.scss'],
  templateUrl: './grupos.component.html',
})

export class GruposComponent implements OnInit{

   constructor(
    private formBuilder: FormBuilder,
    private grupoService: GrupoService,
    private comissaoService: ComissaoService,
    private comiteService: ComiteService,
    private grupoEstudoService: GrupoEstudoService,
    private grupoGeralService: GrupoGeralService,
    private pessoaService: PessoaService,
    private membroSerice: MembroService,
    private toastrService: NbToastrService,
  ) {
  }

  tipos: Array<string> = ["Selecionar","Comissão","Comitê","Estudos","Geral"];
  selecTipos: number;
  formulario: FormGroup;
  grupo = {} as Grupo;
  comissao = {} as Comissao;
  comite = {} as Comite;
  grupoEstudo = {} as GrupoEstudo;
  grupoGeral = {} as GrupoGeral;
  membro = {} as Membro;
  pessoas: Pessoa[];
  pessoaMembro: Pessoa[];

  ngOnInit() {
    this.getPessoa();
    this.createFormGroup();
  }

  onSubmit(){
    this.grupo.titulo = this.formulario.controls['titulo'].value;
    this.grupo.descricao = this.formulario.controls['descricao'].value;
    this.grupo.tipo = this.formulario.controls['tipo_grupo'].value;
    this.grupo.localizacao = this.formulario.controls['localizacao'].value;
    this.grupo.criador = Utils.getSessionPessoa();

    this.grupoService.saveGrupo(this.grupo).subscribe((grupo: Grupo) => {

      if(this.formulario.controls['tipo_grupo'].value === "Comissão"){
        this.comissao.grupo = grupo;
        this.comissao.dataInicio = this.formulario.controls['data_inicio'].value;
        this.comissao.dataFim = this.formulario.controls['data_fim'].value;
        this.comissao.tipoComissao = this.formulario.controls['tipo_grupo_criado'].value;
        this.comissao.objetivoComissao = this.formulario.controls['objetivo_grupo'].value;
        this.comissao.portariaComissao = this.formulario.controls['portaria_grupo'].value;
        this.comissao.acoesComissao = this.formulario.controls['acoes_grupo'].value;
        this.comissao.anotacoesComissao = this.formulario.controls['anotacoes_grupo'].value;

        this.comissaoService.saveComissao(this.comissao).subscribe((comissao:Comissao)=>{
          this.toastrService.show(
            'Comissão Registrada!',
            'Sucesso!',
            {status: 'success'});
            this.formulario.reset();
            this.selecTipos = 0;
            this.pessoaMembro = [];
        },(err) => {
              this.toastrService.show(
                'Problema ao registrar Comissão!',
                'Ops!',
                {status: 'danger'});
        });
      }

      if(this.formulario.controls['tipo_grupo'].value === "Comitê"){
        this.comite.grupo = grupo;
        this.comite.dataInicio = this.formulario.controls['data_inicio'].value;
        this.comite.dataFim = this.formulario.controls['data_fim'].value;
        this.comite.tipoComite = this.formulario.controls['tipo_grupo_criado'].value;
        this.comite.objetivoComite = this.formulario.controls['objetivo_grupo'].value;
        this.comite.portariaComite = this.formulario.controls['portaria_grupo'].value;
        this.comite.acoesComite = this.formulario.controls['acoes_grupo'].value;
        this.comite.anotacoesComite = this.formulario.controls['anotacoes_grupo'].value;

        this.comiteService.saveComite(this.comite).subscribe((comite:Comite)=>{
          this.toastrService.show(
            'Comitê Registrado!',
            'Sucesso!',
            {status: 'success'});
            this.formulario.reset();
            this.selecTipos = 0;
            this.pessoaMembro = [];
        },(err) => {
          this.toastrService.show(
            'Problema ao registrar Comitê!',
            'Ops!',
            {status: 'danger'});
        });
      }

      if(this.formulario.controls['tipo_grupo'].value === "Estudos"){
        this.grupoEstudo.grupo = grupo;
        this.grupoEstudo.dataInicio = this.formulario.controls['data_inicio'].value;
        this.grupoEstudo.dataFim = this.formulario.controls['data_fim'].value;
        this.grupoEstudo.disciplina = this.formulario.controls['disciplina_grupo'].value;
        this.grupoEstudo.anotacoesEstudos = this.formulario.controls['anotacoes_grupo'].value;

        this.grupoEstudoService.saveGrupoEstudo(this.grupoEstudo).subscribe((grupoEstudo: GrupoEstudo)=>{
          this.toastrService.show(
            'Grupo de estudos Registrado!',
            'Sucesso!',
            {status: 'success'});
            this.formulario.reset();
            this.selecTipos = 0;
            this.pessoaMembro = [];
        },(err) => {
          this.toastrService.show(
            'Problema ao registrar Grupo de estudos!',
            'Ops!',
            {status: 'danger'});
        });
      }

      if(this.formulario.controls['tipo_grupo'].value === "Geral"){
        this.grupoGeral.grupo = grupo;
        this.grupoGeral.dataInicio = this.formulario.controls['data_inicio'].value;
        this.grupoGeral.dataFim = this.formulario.controls['data_fim'].value;

        this.grupoGeralService.saveGrupoGeral(this.grupoGeral).subscribe((grupoGeral: GrupoGeral)=>{
          this.toastrService.show(
            'Grupo geral Registrado!',
            'Sucesso!',
            {status: 'success'});
            this.formulario.reset();
            this.selecTipos = 0;
            this.pessoaMembro = [];
        },(err) => {
          this.toastrService.show(
            'Problema ao registrar Grupo geral!',
            'Ops!',
            {status: 'danger'});
        });
      }

      this.membro.dataEntrada = this.formulario.controls['data_inicio'].value;
      this.membro.grupo = grupo;

      for(let i=0; i<this.pessoaMembro.length;i++){
        this.membro.pessoa = this.pessoaMembro[i];
        this.membroSerice.saveMembro(this.membro).subscribe((membro:Membro)=>{
        });
      }
    });

  }

  tipoDeGrupo($event){
    if($event == "Comissão"){
      this.selecTipos = 1;
      this.formulario.controls['tipo_grupo'].setValue('Comissão');
    }
    if($event == "Comitê"){
      this.selecTipos = 2;
      this.formulario.controls['tipo_grupo'].setValue('Comitê');
    }
    if($event == "Estudos"){
      this.selecTipos = 3;
      this.formulario.controls['tipo_grupo'].setValue('Estudos');
    }
    if($event == "Geral"){
      this.selecTipos = 4;
      this.formulario.controls['tipo_grupo'].setValue('Geral');
    }
  }

  createFormGroup(){
    this.formulario = this.formBuilder.group({
      id_grupo: [null],
      titulo: [null],
      descricao: [null],
      tipo_grupo: [null],
      localizacao: [null],
      id_criador: [null],
      data_inicio: [null],
      data_fim: [null],
      tipo_grupo_criado: [null],
      objetivo_grupo: [null],
      portaria_grupo: [null],
      acoes_grupo: [null],
      anotacoes_grupo: [null],
      disciplina_grupo: [null],
    });
  }

  getPessoa() {
      this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
        this.pessoas = pessoas;
      });
  }

  membros($event){
    this.pessoaMembro = ($event);
  }

}
