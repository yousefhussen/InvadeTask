import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  // this function could replace the check function in the auth service
  getUser(): Observable<any> {
     return this.http.get<{ valid: boolean }>(`${this.apiUrl}/api/user`);
  }
  
  private apiUrl:string = environment.apiUrl;
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getisAuthenticatedSubject(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getuserNameSubject(): Observable<string> {
    return this.userNameSubject.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    
    
      this.CheckAuth().subscribe(isAuth => {
        this.isAuthenticatedSubject.next(isAuth);
        if (isAuth) {
          this.getUser().subscribe(user => {
            this.userNameSubject.next(user.name);
          });
        }
      });
    
  }

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  register(name: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, password_confirmation: confirmPassword })
    .pipe(
      tap((response: any) => {
        
        this.checkAuthentication();
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
    return this.http.post(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap((response: any) => {
       
        this.checkAuthentication();
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

  logout(email: string): void {
    //send a post request to the logout endpoint
    this.http.post(`${this.apiUrl}/logout`, {
      //send email
      email : email
    }, {
     
    }).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      
    );
    
    
    this.checkAuthentication();
    this.snackBar.open('Logged out successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  
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
    return this.CheckAuth();
  }

  private CheckAuth(): Observable<boolean> {
   

    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/api/user`).pipe(
      
      map((response: any) => response.id ? true : false),
      catchError(() => of(false))
    );
  }


  
}