import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const csrfToken = this.getCookie('XSRF-TOKEN');

    if (token) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-XSRF-TOKEN': csrfToken || '',
          'Accept': 'application/json',
        }
      });
    } else if (csrfToken) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Accept': 'application/json',
        }
      });
    } else {
      request = request.clone({
        withCredentials: true
      });
    }

    return next.handle(request);
  }

  private getCookie(name: string): string | undefined {
    const nameLenPlus = name.length + 1;
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || undefined;
  }
}