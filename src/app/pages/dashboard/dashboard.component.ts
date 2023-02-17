import { NgForm } from '@angular/forms';
import { PessoaService } from './../../services/pessoa.service';
import { MembroService } from './../../services/membro.service';
import {  Component, OnDestroy} from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../models/grupo';
import { Membro } from '../../models/membro';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  activePagination: boolean = false;
  options: any = {};
  themeSubscription: any;
  tipos: Array<string> = ['Comissão','Comitê','Estudos','Geral'];
  grupos: Grupo[] = [];
  membros: Membro[];
  pessoas: Pessoa[];
  pessoa = {} as Pessoa;
  pag: Number = 1 ;
  contador: Number = 2;
  quantidade = [
    { value: 0, name: 'Comissão' },
    { value: 0, name: 'Comitê' },
    { value: 0, name: 'Estudos' },
    { value: 0, name: 'Geral' },
  ]

  constructor(
      private grupoService: GrupoService,
      private membroService: MembroService,
      private pessoaService: PessoaService,
      private toastrService: NbToastrService,
      private theme: NbThemeService
    ) {
  }

  ngOnInit() {
    this.getGrupos();
    this.getPessoa();
    this.getMembros();
  }

  getGrupos(){

    this.grupoService.getGrupos().subscribe((grupos:Grupo[])=>{
      this.grafico(grupos);
    });
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
        if(this.membros[i].pessoa.id === this.pessoa.id){
          this.grupos.push(this.membros[i].grupo);
        }
      }
    });
  }

  getQtdGrupos(grupos){

    for(let a in grupos){
        for(let i in this.tipos){
          if(grupos[a].tipo === this.tipos[i]){
            let data = this.quantidade.find(e=>e.name === this.tipos[i]);
            data.value = data.value + 1

          }
        }
    }
    return this.quantidade;
  }

  buscarGrupos(form: NgForm ){
    let id:string;

    for(let i in this.pessoas){
      if(form.value.nome == this.pessoas[i].nome){
        id =this.pessoas[i].id;
      }
    }

    if(id!== null || id !== undefined){
      for(let i=0;  i<this.membros.length; i++){
        if(this.membros[i].pessoa.id === id){
          this.grupos.push(this.membros[i].grupo);
          this.activePagination = true;
        }
      }
    }

    if(id === null || id === undefined){
      this.activePagination = false;
      this.toastrService.show(
        'Pessoa não é membro de grupo!',
        'Não encontrado!',
        {status: 'warning'});
    }


  }

  grafico(grupos) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.tipos,
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Quantidade',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.getQtdGrupos(grupos),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
