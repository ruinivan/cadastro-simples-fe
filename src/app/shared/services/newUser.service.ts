import { NewUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NewUserService {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  async newUser(body: NewUser) {
    try {
      const response: any = await this.authService.newUser(body);
      if (response.status !== 201) {
        alert(response.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
