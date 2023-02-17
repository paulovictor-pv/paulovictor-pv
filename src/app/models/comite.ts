import { Grupo } from "./grupo";

export interface Comite {
  dataInicio: string;
  dataFim: string;
  tipoComite: string;
  objetivoComite: string;
  portariaComite: string;
  acoesComite: string;
  anotacoesComite: string;
  grupo: Grupo;
  id: string;
}
