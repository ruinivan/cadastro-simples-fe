import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NewUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/user/';

  constructor(private httpClient: HttpClient) {}

  async login(body: { email: string; password: string }) {
    return await lastValueFrom(this.httpClient.post(this.url + 'login', body));
  }

  async newUser(body: NewUser) {
    try {
      const retorno = await lastValueFrom(
        this.httpClient.post(this.url, body, { observe: 'response' })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async show() {
    return await lastValueFrom(this.httpClient.get(this.url));
  }

  async search(id: string) {
    return await lastValueFrom(this.httpClient.get(this.url + id));
  }

  async update(body: {
    id: string;
    name: string;
    email: string;
    password: string;
    birthDay: string;
    telephone: number;
  }) {
    return await lastValueFrom(this.httpClient.put(this.url + body.id, body));
  }

  async delete(id: string) {
    return await lastValueFrom(this.httpClient.delete(this.url + id));
  }
}
