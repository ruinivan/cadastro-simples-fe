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
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  formNewUser: FormGroup<any> = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
    birthDay: [],
    telephone: [],
  });

  get name(): FormControl {
    return this.formNewUser.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.formNewUser.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formNewUser.get('password') as FormControl;
  }

  get birthDay(): FormControl {
    return this.formNewUser.get('birthDay') as FormControl;
  }

  get telephone(): FormControl {
    return this.formNewUser.get('telephone') as FormControl;
  }

  newUser() {
    const body: User = {
      name: this.formNewUser.get('name')?.value,
      email: this.formNewUser.get('email')?.value,
      password: this.formNewUser.get('password')?.value,
      birthDay: this.formNewUser.get('birthDay')?.value,
      telephone: this.formNewUser.get('telephone')?.value,
    };
    const response = this.authService.create(body);
    console.log(response);

    //this.router.navigate(['']);
  }
}
