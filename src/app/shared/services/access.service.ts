import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  private accessAllowed: boolean = false;

  allowAccess() {
    this.accessAllowed = true;
  }

  denyAccess() {
    this.accessAllowed = false;
  }

  canAccess() {
    return this.accessAllowed;
  }
}
