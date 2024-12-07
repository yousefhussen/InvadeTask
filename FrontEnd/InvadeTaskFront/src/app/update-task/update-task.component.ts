import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/auth/task/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Category } from '../Models/Task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  providers: [DatePipe]
})
export class UpdateTaskComponent implements OnInit {
  task: any = {};
  taskId: number;
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadTask();
    this.loadCategories();
  }

  loadTask(): void {
    this.taskService.getTask(this.taskId)
      .subscribe((task) => {
        this.task = task;
        this.task.due_date = new Date(this.task.due_date);
      });
  }

  loadCategories(): void {
    this.taskService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateTask(): void {
    this.task.due_date = this.datePipe.transform(this.task.due_date, 'yyyy-MM-dd');
    this.taskService.updateTask(this.taskId, this.task).subscribe(() => {
      this.router.navigate(['/list']);
      this.snackBar.open('Task updated successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}