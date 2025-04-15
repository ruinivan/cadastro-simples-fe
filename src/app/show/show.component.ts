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
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss',
})
export class ShowComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private accessService: AccessService,
    public dialog: MatDialog
  ) {}
  editar: boolean = false;
  changeNewUser: boolean = false;
  users: User[] = [];
  editUserId: string = '';
  ngOnInit(): void {
    this.showUser();
  }

  async showUser() {
    try {
      const response: any = await this.authService.show();
      this.users = response;
    } catch (error) {
      console.log(error);
    }
  }

  async doUser(user?: User) {
    const dialog = await this.dialog.open(EditUserModalComponent, {
      data: user ? user : null,
      width: '35vw', // ou outro valor
      disableClose: false,
      autoFocus: true,
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.showUser();
      }
    });
    // Dialog quando fechar atualiza a lista de usuários
  }

  async deleteUser(id: string) {
    try {
      await this.authService.delete(id!);
      this.showUser();
    } catch (error) {
      console.log(error);
    }
  }

  changeNewUserButton() {
    this.changeNewUser = !this.changeNewUser;
  }

  formNewUser: FormGroup<any> = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    birthDay: ['', Validators.required],
    telephone: [''],
  });
}
