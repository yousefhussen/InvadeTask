import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.categoryId).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }
}