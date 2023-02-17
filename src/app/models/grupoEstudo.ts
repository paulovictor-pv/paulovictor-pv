import { Grupo } from "./grupo";

export interface GrupoEstudo {
  dataInicio: string;
  dataFim: string;
  disciplina: string;
  anotacoesEstudos: string;
  grupo: Grupo;
  id: string;
}
