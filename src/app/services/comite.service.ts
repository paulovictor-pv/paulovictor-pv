import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Comite } from '../models/comite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComiteService {

  url = `${environment.apiUrl}api/comite`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as Comites (GET)
  getComites(): Observable<Comite[]> {
    return this.httpClient.get<Comite[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem Comite pelo seu ID (GET ID)
  getComiteId(id: string): Observable<Comite> {
    return this.httpClient.get<Comite>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma Comite (POST)
  saveComite(comite): Observable<Comite> {
    return this.httpClient.post<Comite>(this.url, JSON.stringify(comite), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma Comite (PUT)
  updateComite(comite: Comite): Observable<Comite> {
    return this.httpClient.put<Comite>
    (this.url + '/' + comite.id, JSON.stringify(comite), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca comite
  buscarComite(comite): Observable<Comite[]> {
    return this.httpClient.post<Comite[]>(this.url + '/busca', JSON.stringify(comite), this.httpOptions)
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
