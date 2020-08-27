import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('isLogin') === 'true') {
      if (sessionStorage.getItem('role') === 'SUPERUSER' || sessionStorage.getItem('role') === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['/not-enough-permissions']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
