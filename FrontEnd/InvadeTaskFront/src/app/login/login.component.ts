import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string  = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.getCsrfToken().subscribe(() => {

      this.authService.login(this.email, this.password).pipe(
        //set the token in the local storage
        (response: any) => {
          localStorage.setItem('token', response.token);
          return response;
        }

      ).subscribe(

      );
    });
  }
}