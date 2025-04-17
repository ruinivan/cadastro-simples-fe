import { Component, inject } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-modal',
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
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DeleteUserModalComponent {
  id = inject(MAT_DIALOG_DATA);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<DeleteUserModalComponent>
  ) {}

  async cancel() {
    this.dialogRef.close(false);
  }

  async deleteUser() {
    const response = await this.userService.delete(this.id);
    this.dialogRef.close({
      status: true,
      message: response,
    });
  }
}
