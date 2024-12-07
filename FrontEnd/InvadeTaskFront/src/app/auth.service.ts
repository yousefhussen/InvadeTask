import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  register(name: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, password_confirmation: confirmPassword }, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.snackBar.open('Registration successful', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.router.navigate(['/protected']);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.router.navigate(['/protected']);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.snackBar.open('Logged out successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      // Backend returned an unsuccessful response code and error message
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code without error message
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  
    return throwError(errorMessage);
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.validateToken(token);
  }

  private validateToken(token: string): Observable<boolean> {
    console.log('validateToken');

    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).pipe(
      
      map((response: any) => response.id ? true : false),
      catchError(() => of(false))
    );
  }


  
}