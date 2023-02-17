import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GrupoGeral } from '../models/grupoGeral';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrupoGeralService {

  url = `${environment.apiUrl}api/grupogeral`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as GrupoGerals (GET)
  getGrupoGerals(): Observable<GrupoGeral[]> {
    return this.httpClient.get<GrupoGeral[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem GrupoGeral pelo seu ID (GET ID)
  getGrupoGeralId(id: string): Observable<GrupoGeral> {
    return this.httpClient.get<GrupoGeral>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma GrupoGeral (POST)
  saveGrupoGeral(grupoGeral): Observable<GrupoGeral> {
    return this.httpClient.post<GrupoGeral>(this.url, JSON.stringify(grupoGeral), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma GrupoGeral (PUT)
  updateGrupoGeral(grupoGeral: GrupoGeral): Observable<GrupoGeral> {
    return this.httpClient.put<GrupoGeral>
    (this.url + '/' + grupoGeral.id, JSON.stringify(grupoGeral), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca grupoGeral
  buscarGrupoGeral(grupoGeral): Observable<GrupoGeral[]> {
    return this.httpClient.post<GrupoGeral[]>(this.url + '/busca', JSON.stringify(grupoGeral), this.httpOptions)
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
