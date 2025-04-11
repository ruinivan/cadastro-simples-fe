import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {}

  async login(body: { email: string; senha: string }) {
    return await await lastValueFrom(
      this.httpClient.post(this.url + '/login', body)
    );
  }
  async cadastro(body: {
    nome: string;
    email: string;
    senha: string;
    dataNascimento: string;
    telefone: string;
  }) {
    return await await lastValueFrom(
      this.httpClient.post(this.url + '', body, { observe: 'response' })
    );
  }
}
