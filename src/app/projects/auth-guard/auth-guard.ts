import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GeneralApiService } from "../services/general/general-api-service";

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(GeneralApiService);
  const router = inject(Router);

  return authService.checkLogin().pipe(
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['route-to-fallback-page']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['route-to-fallback-page']);
      return of(false);
    })
  );
};
  
export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);