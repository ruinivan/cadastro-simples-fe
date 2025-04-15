import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/user/';

  constructor(private httpClient: HttpClient) {}

  async login(body: { email: string; password: string }) {
    return await lastValueFrom(this.httpClient.post(this.url + 'login', body));
  }

  async create(body: User) {
    try {
      const retorno = await lastValueFrom(
        this.httpClient.post(this.url, body, { observe: 'response' })
      );
      return retorno;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async show() {
    return await lastValueFrom(this.httpClient.get(this.url));
  }

  async search(id: string) {
    return await lastValueFrom(this.httpClient.get(this.url + id));
  }

  async update(id: string, body: User) {
    return await lastValueFrom(this.httpClient.patch(this.url + id, body));
  }

  async delete(id: string) {
    return await lastValueFrom(this.httpClient.delete(this.url + id));
  }
}
