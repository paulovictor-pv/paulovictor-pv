import { Grupo } from "./grupo";

export interface Comissao {
  dataInicio: string;
  dataFim: string;
  tipoComissao: string;
  objetivoComissao: string;
  portariaComissao: string;
  acoesComissao: string;
  anotacoesComissao: string;
  grupo: Grupo;
  id: string;
}
