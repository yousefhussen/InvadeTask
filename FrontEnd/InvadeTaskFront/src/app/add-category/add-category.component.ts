import { Component } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category: any = {};

  constructor(private categoryService: CategoryService, private router: Router) {}

  addCategory(): void {
    this.categoryService.addCategory(this.category).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }
}