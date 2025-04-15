import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../shared/services/access.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss',
})
export class ShowComponent {
  displayedColumns: string[] = [
    '_id',
    'name',
    'email',
    'password',
    'birthDay',
    'telephone',
    'actions',
  ];
  loading: boolean = true;
  users: User[] = [];
  editUserId: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private accessService: AccessService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.showUser();
  }

  async showUser() {
    try {
      const response: any = await this.authService.show();
      this.users = response;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async doUser(user?: User) {
    const dialog = await this.dialog.open(EditUserModalComponent, {
      data: user ? user : null,
    });
    console.log(user);
    console.log(this.editUserId);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.showUser();
      }
    });
  }

  async deleteUser(id: string) {
    try {
      await this.authService.delete(id!);
      this.showUser();
    } catch (error) {
      console.log(error);
    }
  }

  formNewUser: FormGroup<any> = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birthDay: ['', [Validators.required]],
    telephone: [''],
  });
}
