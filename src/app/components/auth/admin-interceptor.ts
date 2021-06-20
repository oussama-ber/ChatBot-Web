import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const adminToken = this.authService.getAdminToken();
    console.log(adminToken);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + adminToken)
 });
    console.log(adminToken);

    return next.handle(authRequest);
  }

}
