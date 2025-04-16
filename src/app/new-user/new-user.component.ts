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
  response: HttpStatusCode | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  formNewUser: FormGroup<any> = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birthDay: [],
    telephone: [],
  });

  async newUser() {
    const body: User = {
      name: this.formNewUser.get('name')?.value,
      email: this.formNewUser.get('email')?.value,
      password: this.formNewUser.get('password')?.value,
      birthDay: this.formNewUser.get('birthDay')?.value,
      telephone: this.formNewUser.get('telephone')?.value,
    };
    this.response = await this.authService.create(body);
    if (this.response == 201) {
      this.router.navigate(['']);
    }
  }
  voltar() {
    this.router.navigate(['']);
  }
}
