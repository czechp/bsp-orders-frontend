import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthorizationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLogin()) {
      let request = req.clone(
        {
          setHeaders: {
            Authorization: sessionStorage.getItem("credentials")
          }
        }
      );
      return next.handle(request);
    }
    return next.handle(req);
  }
}
