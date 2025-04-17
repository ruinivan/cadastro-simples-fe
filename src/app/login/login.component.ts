import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AccessService } from '../shared/services/access.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  response: string | undefined;
  sucess: boolean = false;
  erro: boolean = false;

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private accessService: AccessService
  ) {}

  get email(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formLogin.get('password') as FormControl;
  }

  async sendLogin() {
    this.erro = false;
    this.sucess = false;
    if (!this.formLogin.valid) return;
    const body = {
      email: this.email.value,
      password: this.password.value,
    };
    try {
      this.response = await this.authService.login(body);
      console.log(this.response);
      if (this.response === 'Login Success') {
        this.sucess = true;
        this.accessService.allowAccess();
        setTimeout(() => {
          this.router.navigate(['show-users']);
        }, 1000);
      } else {
        this.erro = true;
        this.response = 'Invalid email or password';
      }
    } catch (error) {
      this.erro = true;
      this.response = 'Invalid email or password';
    }
  }

  newUserPage() {
    this.router.navigate(['/new-user']);
  }
}
