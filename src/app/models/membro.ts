import { Pessoa } from "./pessoa";
import { Grupo } from "./grupo";

export interface Membro {
  dataEntrada: string;
  dataSaida: string;
  pessoa: Pessoa;
  grupo: Grupo;
  id: string;
}
