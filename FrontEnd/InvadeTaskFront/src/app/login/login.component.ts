import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.getCsrfToken().subscribe(() => {
      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          
          
          this.router.navigate(['/']);
        },
        error => {
          console.error('Login failed:', error);
        }
      );
    });
  }
}