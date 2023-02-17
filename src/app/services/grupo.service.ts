import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Grupo } from '../models/grupo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {

  url = `${environment.apiUrl}api/grupo`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as Grupos (GET)
  getGrupos(): Observable<Grupo[]> {
    return this.httpClient.get<Grupo[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem Grupo pelo seu ID (GET ID)
  getGrupoId(id: string): Observable<Grupo> {
    return this.httpClient.get<Grupo>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma Grupo (POST)
  saveGrupo(grupo): Observable<Grupo> {
    return this.httpClient.post<Grupo>(this.url, JSON.stringify(grupo), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma Grupo (PUT)
  updateGrupo(grupo: Grupo): Observable<Grupo> {
    return this.httpClient.put<Grupo>
    (this.url + '/' + grupo.id, JSON.stringify(grupo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca grupo
  buscarGrupo(grupo): Observable<Grupo[]> {
    return this.httpClient.post<Grupo[]>(this.url + '/busca', JSON.stringify(grupo), this.httpOptions)
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
