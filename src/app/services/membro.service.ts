import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Membro } from '../models/membro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembroService {

  url = `${environment.apiUrl}api/membro`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as Membros (GET)
  getMembros(): Observable<Membro[]> {
    return this.httpClient.get<Membro[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem Membro pelo seu ID (GET ID)
  getMembroId(id: string): Observable<Membro> {
    return this.httpClient.get<Membro>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma Membro (POST)
  saveMembro(membro): Observable<Membro> {
    return this.httpClient.post<Membro>(this.url, JSON.stringify(membro), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma Membro (PUT)
  updateMembro(membro: Membro): Observable<Membro> {
    return this.httpClient.put<Membro>
    (this.url + '/' + membro.id, JSON.stringify(membro), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca membro
  buscarMembro(membro): Observable<Membro[]> {
    return this.httpClient.post<Membro[]>(this.url + '/busca', JSON.stringify(membro), this.httpOptions)
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
