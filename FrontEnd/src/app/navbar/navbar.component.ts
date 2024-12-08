import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getisAuthenticatedSubject().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.authService.getuserNameSubject().subscribe(name => {
      this.userName = name;
    });
  }

  logout(): void {
    
      this.authService.getUser().subscribe((response) => {
        this.authService.logout(response.email);
      }
      );
      this.router.navigate(['/login']);
    }
  
}