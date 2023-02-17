import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Comissao } from '../models/comissao';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComissaoService {

  url = `${environment.apiUrl}api/comissao`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as Comissaos (GET)
  getComissaos(): Observable<Comissao[]> {
    return this.httpClient.get<Comissao[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem Comissao pelo seu ID (GET ID)
  getComissaoId(id: string): Observable<Comissao> {
    return this.httpClient.get<Comissao>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma Comissao (POST)
  saveComissao(comissao): Observable<Comissao> {
    return this.httpClient.post<Comissao>(this.url, JSON.stringify(comissao), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma Comissao (PUT)
  updateComissao(comissao: Comissao): Observable<Comissao> {
    return this.httpClient.put<Comissao>
    (this.url + '/' + comissao.id, JSON.stringify(comissao), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca comissao
  buscarComissao(comissao): Observable<Comissao[]> {
    return this.httpClient.post<Comissao[]>(this.url + '/busca', JSON.stringify(comissao), this.httpOptions)
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
