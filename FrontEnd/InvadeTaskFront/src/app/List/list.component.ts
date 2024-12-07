import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/auth/task/task.service';
import { Task, Category } from '../Models/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  search: string = '';
  filters: any = {};
  page: number = 1;
  totalPages: number = 1;
  selectedDate: any;
  sort_by: string = '';
  sortOrder: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks(this.page, this.search, this.filters,this.sort_by,this.sortOrder).subscribe(
      (response: any) => {
        this.tasks = response.data;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  loadCategories(): void {
    this.taskService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search = target.value;
    this.loadTasks();
  }

  onFilterChange(event: Event, filterKey: string): void {
    const target = event.target as HTMLSelectElement;
    this.filters[filterKey] = target.value;
    this.loadTasks();
  }

  onDateChange(event: any) {
    const selectedDate = event.value;
    // Filter tasks based on the selected due date
    this.tasks = this.tasks.filter(task => new Date(task.due_date).toDateString() === new Date(selectedDate).toDateString());
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadTasks();
  }

  onSortChange(event: any) {
    const sortByElement = document.getElementById('sortBy') as HTMLSelectElement;
    const sortOrderElement = document.getElementById('sortOrder') as HTMLSelectElement;
    this.sort_by = sortByElement.value;
    this.sortOrder = sortOrderElement.value;
    this.loadCategories();
    this.loadTasks();
  }

  resetDate() {
    this.selectedDate = null;
    // Reset the task list or reapply other filters as needed
    this.loadCategories();
    this.loadTasks(); // Assuming getAllTasks() fetches the complete list of tasks
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }
}