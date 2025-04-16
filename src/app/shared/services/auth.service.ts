import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AccessService } from './access.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/user/';
  response: HttpResponse<object> | undefined;
  constructor(
    private httpClient: HttpClient,
    private accessService: AccessService,
    private router: Router
  ) {}

  async login(body: { email: string; password: string }) {
    this.response = await lastValueFrom(
      this.httpClient.post(this.url + 'login', body, { observe: 'response' })
    );
    if (this.response.status === 200) {
      this.accessService.allowAccess();
      return (this.response.body as { message: string }).message;
    } else {
      return (this.response.body as { message: string }).message;
    }
  }

  async create(body: User) {
    try {
      this.response = await lastValueFrom(
        this.httpClient.post(this.url, body, { observe: 'response' })
      );
      if (this.response.status === 201) {
        return (this.response.body as { message: string }).message;
      } else return (this.response.body as { message: string }).message;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return error.error?.message;
      } else return;
    }
  }
}
