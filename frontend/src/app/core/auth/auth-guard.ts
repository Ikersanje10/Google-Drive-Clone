import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // TODO: ADD METHOD INTO THE AUTH SERVICE -> isAuthenticated()?;
  return true;
};
