import { Component } from '@angular/core';
import { TaskService } from '../services/auth/task/task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Category } from '../Models/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [DatePipe]
})
export class AddTaskComponent {
  task: any = {
    id: 0
  };
  categories: Category[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    taskService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addTask(): void {
    this.task.due_date = this.datePipe.transform(this.task.due_date, 'yyyy-MM-dd');
    this.taskService.addTask(this.task).subscribe(() => {
      this.router.navigate(['/list']);
      this.snackBar.open('Task added successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}