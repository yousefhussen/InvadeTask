import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; 
  

  constructor(private authService: AuthService , private router: Router) {}

  register() {
    this.authService.getCsrfToken().subscribe(() => {
      this.authService.register(this.name, this.email, this.password, this.confirmPassword).subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
    });
  }
}