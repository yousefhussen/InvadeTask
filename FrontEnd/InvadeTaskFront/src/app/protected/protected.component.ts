import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
  

  constructor(
    private authService: AuthService
  ) {}
 
}
