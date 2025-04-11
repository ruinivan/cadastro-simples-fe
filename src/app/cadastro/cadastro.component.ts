import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  form: FormGroup<any> = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    telefone: [''],
  });

  async cadastrar() {
    const body = {
      nome: this.form.get('nome')?.value,
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value,
      dataNascimento: this.form.get('dataNasciemnto')?.value,
      telefone: this.form.get('telefone')?.value,
    };
    try {
      const response: any = await this.authService.cadastro(body);

      if (response.status !== 201) {
        alert(response.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
