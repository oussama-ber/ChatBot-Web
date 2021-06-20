import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthAdmin implements CanActivate{

 constructor(private authService: AuthService, private router: Router){};

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
    const isAdmin = this.authService.getIsAdmin();
    if(!isAdmin){
      this.router.navigate(['/dashboard']);
    }
    return isAdmin;
  }

}
