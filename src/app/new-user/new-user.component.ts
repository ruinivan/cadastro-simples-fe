import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewUserComponent {
  resposta: string | undefined;
  sucess: boolean = false;
  erro: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  formNewUser: FormGroup<any> = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
    birthDay: [],
    telephone: [],
  });

  async newUser() {
    this.erro = false;
    this.sucess = false;
    const body: User = {
      name: this.formNewUser.get('name')?.value,
      email: this.formNewUser.get('email')?.value,
      password: this.formNewUser.get('password')?.value,
      birthDay: this.formNewUser.get('birthDay')?.value,
      telephone: this.formNewUser.get('telephone')?.value,
    };
    const response = await this.authService.create(body);
    if (response === 'User created sucessfully') {
      this.sucess = true;
      this.resposta = response;
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);
    } else {
      this.erro = true;
      this.resposta = response;
    }
  }
  voltar() {
    this.router.navigate(['']);
  }
}
