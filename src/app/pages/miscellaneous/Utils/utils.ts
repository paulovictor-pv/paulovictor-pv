import { Pessoa } from "../../../models/pessoa";

export class Utils {
   public static getSessionPessoa ():any {
        const pessoa_session = sessionStorage.getItem('Pessoa_logada');
        return(JSON.parse(pessoa_session));
    }

    public static attPessoaoLogado(pessoa: Pessoa){
      sessionStorage.setItem('Pessoa_logada',JSON.stringify(pessoa));
    }
}
