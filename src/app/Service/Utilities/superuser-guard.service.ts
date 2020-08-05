import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CurrentUser } from '../Authorization/CurrentUser';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem("isLogin")==="true"){
      if(CurrentUser.appUser.role ==="SUPERUSER"){
        this.router.navigate(["/order-superuser"])
      }else{
        this.router.navigate(["/not-enough-permissions"])
      }
    }else
    {
      this.router.navigate(["/login"]);
    }
    return false;
  }
}
