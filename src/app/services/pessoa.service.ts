import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  url = `${environment.apiUrl}api/pessoa`; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as Pessoas (GET)
  getPessoas(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // Obtem Pessoa pelo seu ID (GET ID)
  getPessoaId(id: string): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // salva uma Pessoa (POST)
  savePessoa(pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(this.url, JSON.stringify(pessoa), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
        );
  }

  // autualiza os dados de uma Pessoa (PUT)
  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.put<Pessoa>
    (this.url + '/' + pessoa.id, JSON.stringify(pessoa), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  // busca pessoa
  buscarPessoa(pessoa): Observable<Pessoa[]> {
    return this.httpClient.post<Pessoa[]>(this.url + '/busca', JSON.stringify(pessoa), this.httpOptions)
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
