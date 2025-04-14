import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  url = 'http://localhost:3000/user/';
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
