import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) {}

  register() {
    this.authService.getCsrfToken().subscribe(() => {
      this.authService.register(this.name, this.email, this.password, this.confirmPassword).subscribe();
    });
  }
}