import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/auth/task/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../Models/Task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  task: any = {};
  taskId: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getTask(this.taskId).subscribe((task) => {
      this.task = task;
    });
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.taskId).subscribe(() => {
      this.router.navigate(['/list']);
      this.snackBar.open('Task deleted successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}