import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AccessService } from '../shared/services/access.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private accessService: AccessService
  ) {}

  form: FormGroup<any> = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  changeShowPasswordStatus() {
    this.showPassword = !this.showPassword;
  }

  async sendLogin() {
    const body = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };
    try {
      const response: any = await this.authService.login(body);
      // if(!response.status) {
      //   alert(response.status)
      // }
      this.accessService.allowAccess();
      this.router.navigate(['/show-users']);
    } catch (error) {
      console.log(error);
    }
  }

  newUserPage() {
    this.router.navigate(['/new-user']);
  }
}
