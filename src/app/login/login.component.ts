import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { cpfValidator } from '../shared/validators/cpf.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  form: FormGroup<any> = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    age: ['', [Validators.min(18), Validators.required]],
    cpf: ['', [cpfValidator, Validators.required]],
  });
}
