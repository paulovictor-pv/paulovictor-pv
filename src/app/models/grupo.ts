import { Pessoa } from "./pessoa";

export interface Grupo {
  titulo: string;
  descricao: string;
  tipo: string;
  localizacao: string;
  criador: Pessoa;
  id: string;
}
