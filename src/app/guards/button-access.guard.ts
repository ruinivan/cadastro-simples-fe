// guards/botao-acesso.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccessService } from '../shared/services/access.service';

@Injectable({
  providedIn: 'root',
})
export class ButtonAccessGuard implements CanActivate {
  constructor(private accessService: AccessService, private router: Router) {}

  canActivate(): boolean {
    if (this.accessService.canAccess()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
