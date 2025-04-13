import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewUser } from '../shared/interfaces/user.interface';
import { NewUserService } from '../shared/services/newUser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  constructor(
    private fb: FormBuilder,
    private newUserService: NewUserService,
    private router: Router
  ) {}

  formNewUser: FormGroup<any> = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    birthDay: [],
    telephone: [],
  });

  newUser() {
    const body: NewUser = {
      name: this.formNewUser.get('name')?.value,
      email: this.formNewUser.get('email')?.value,
      password: this.formNewUser.get('password')?.value,
      birthDay: this.formNewUser.get('birthDay')?.value,
      telephone: this.formNewUser.get('telephone')?.value,
    };
    this.newUserService.newUser(body);
    this.router.navigate(['']);
  }
}
