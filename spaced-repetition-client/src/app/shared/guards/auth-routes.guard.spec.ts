import { TestBed } from '@angular/core/testing';

import { AuthRoutesGuard } from './auth-routes.guard';

describe('AuthRoutesGuard', () => {
  let guard: AuthRoutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
