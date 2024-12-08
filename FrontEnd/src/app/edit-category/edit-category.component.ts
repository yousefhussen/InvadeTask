import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: any = {};
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategory(this.categoryId).subscribe((category) => {
      this.category = category;
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }
}