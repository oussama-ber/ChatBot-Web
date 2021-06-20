import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    console.log('authToken 9bal : ' + authToken);
    // const adminToken = this.authService.getAdminToken();
    // console.log('adminToken 9bal ' + adminToken);

    // if (adminToken != null) {
    //   const adminRequest = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + adminToken)
    //   });
    //   // const authRequest = req.clone({
    //   //   headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    //   // });
    //   console.log('admin token : ' + adminToken);
    //   console.log(' auth Token ' + authToken);
    //   return next.handle(adminRequest);
    // }

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
