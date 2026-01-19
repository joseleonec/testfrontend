import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const credentials = btoa(`${environment.auth.username}:${environment.auth.password}`);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Basic ${credentials}`
    }
  });
  return next(authReq);
};
