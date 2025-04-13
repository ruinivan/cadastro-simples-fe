import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { EditUser, User } from '../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NewUser } from '../shared/interfaces/user.interface';
import { NewUserService } from '../shared/services/newUser.service';
import { NewUserComponent } from '../new-user/new-user.component';
import { Router } from '@angular/router';
import { AccessService } from '../shared/services/access.service';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss',
})
export class ShowComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private newUserService: NewUserService,
    private router: Router,
    private accessService: AccessService
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

  formEdit: FormGroup<any> = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    birthDay: ['', Validators.required],
    telephone: [''],
  });

  async editUser(id: string) {
    this.editar = true;
    const user: any = await this.authService.search(id);
    this.formEdit.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      birthDay: user.birthDay,
      telephone: user.telephone,
    });
    this.editUserId = id;
  }

  async confirm() {
    const body: EditUser = {
      id: this.editUserId,
      name: this.formEdit.get('name')?.value,
      email: this.formEdit.get('email')?.value,
      password: this.formEdit.get('password')?.value,
      birthDay: this.formEdit.get('birthDay')?.value,
      telephone: this.formEdit.get('telephone')?.value,
    };
    await this.authService.update(body);
    this.editar = false;
    await this.showUser();
  }

  async deleteUser(id: string) {
    try {
      const userDeleted = await this.authService.delete(id);
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

  async newUserButtun() {
    const body: NewUser = {
      name: this.formNewUser.get('name')?.value,
      email: this.formNewUser.get('email')?.value,
      password: this.formNewUser.get('password')?.value,
      birthDay: this.formNewUser.get('birthDay')?.value,
      telephone: this.formNewUser.get('telephone')?.value,
    };
    this.newUserService.newUser(body);
    this.changeNewUser = false;
    this.formNewUser.reset();
    this.accessService.allowAccess();
    this.router.navigate(['/show-users']);
  }

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
