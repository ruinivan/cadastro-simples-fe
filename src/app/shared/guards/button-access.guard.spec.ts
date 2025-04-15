import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { ButtonAccessGuard } from './button-access.guard';

describe('buttonAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => ButtonAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
