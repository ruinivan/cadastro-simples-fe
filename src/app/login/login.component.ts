import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

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
    private router: Router
  ) {}

  form: FormGroup<any> = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    senha: ['', [Validators.required]],
  });

  changeShowPasswordStatus() {
    this.showPassword = !this.showPassword;
  }

  async enviarLogin() {
    const body = {
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value,
    };
    try {
      const response: any = await this.authService.login(body);

      console.log(response);

      // if(!response.status) {
      //   alert()
      // }
    } catch (error) {}
  }

  cadastroPage() {
    this.router.navigate(['/cadastro']);
  }
}
