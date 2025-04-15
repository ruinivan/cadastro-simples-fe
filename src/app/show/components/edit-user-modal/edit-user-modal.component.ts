import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    CommonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
  providers: [MatDialog],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss',
})
export class EditUserModalComponent {
  isEdition: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<User>,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserModalComponent>
  ) {}

  formEdit: FormGroup<any> = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    birthDay: [],
    telephone: [],
  });

  async ngOnInit() {
    if (this.data?._id) {
      this.isEdition = true;
      this.formEdit.patchValue({
        id: this.data._id,
        name: this.data.name,
        email: this.data.email,
        password: this.data.password,
        birthDay: this.data.birthDay,
        telephone: this.data.telephone,
      });
    }
  }

  async confirm() {
    const body: User = {
      name: this.formEdit.get('name')?.value,
      email: this.formEdit.get('email')?.value,
      password: this.formEdit.get('password')?.value,
      birthDay: this.formEdit.get('birthDay')?.value,
      telephone: this.formEdit.get('telephone')?.value,
    };
    if (this.data?._id) await this.authService.update(this.data._id!, body);
    //else await this.authService.create(body);
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
