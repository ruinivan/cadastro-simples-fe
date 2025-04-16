import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: '',
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
  templateUrl: 'edit-user-modal.component.html',
  styleUrl: 'edit-user-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditUserModalComponent {
  user = inject(MAT_DIALOG_DATA);
  editUser: boolean = false;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditUserModalComponent>
  ) {}

  formUser: FormGroup<any> = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birthDay: [],
    telephone: [],
  });

  ngOnInit() {
    this.loading = true;
    if (this.user) {
      this.formUser.patchValue({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        birthDay: this.user.birthDay,
        telephone: this.user.telephone,
      });
      this.editUser = true;
    }
    this.loading = false;
  }

  doUser() {
    const body: User = {
      name: this.formUser.get('name')?.value,
      email: this.formUser.get('email')?.value,
      password: this.formUser.get('password')?.value,
      birthDay: this.formUser.get('birthDay')?.value,
      telephone: this.formUser.get('telephone')?.value,
    };
    if (this.editUser) {
      this.authService.update(this.user._id, body);
    } else {
      const response = this.authService.create(body);
    }
    this.dialogRef.close(true);
  }
}
