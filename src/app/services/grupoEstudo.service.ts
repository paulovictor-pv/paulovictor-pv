import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GrupoEstudo } from '../models/grupoEstudo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrupoEstudoService {

  url = `${environment.apiUrl}api/grupoestudo`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as GrupoEstudos (GET)
  getGrupoEstudos(): Observable<GrupoEstudo[]> {
    return this.httpClient.get<GrupoEstudo[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem GrupoEstudo pelo seu ID (GET ID)
  getGrupoEstudoId(id: string): Observable<GrupoEstudo> {
    return this.httpClient.get<GrupoEstudo>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma GrupoEstudo (POST)
  saveGrupoEstudo(grupoEstudo): Observable<GrupoEstudo> {
    return this.httpClient.post<GrupoEstudo>(this.url, JSON.stringify(grupoEstudo), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma GrupoEstudo (PUT)
  updateGrupoEstudo(grupoEstudo: GrupoEstudo): Observable<GrupoEstudo> {
    return this.httpClient.put<GrupoEstudo>
    (this.url + '/' + grupoEstudo.id, JSON.stringify(grupoEstudo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca GrupoEstudo
  buscarGrupoEstudo(grupoEstudo): Observable<GrupoEstudo[]> {
    return this.httpClient.post<GrupoEstudo[]>(this.url + '/busca', JSON.stringify(grupoEstudo), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
