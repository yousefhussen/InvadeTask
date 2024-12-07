import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/auth/task/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../Models/Task';

@Component({
  selector: 'app-restore-task',
  templateUrl: './restore-task.component.html',
  styleUrls: ['./restore-task.component.css']
})
export class RestoreTaskComponent implements OnInit {
deleteTask(taskId: number): void {
    this.taskService.forceDeleteTask(taskId).subscribe(() => {
      this.loadDeletedTasks();
      this.snackBar.open('Task Finally deleted successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });

}
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDeletedTasks();
  }

  loadDeletedTasks(): void {
    this.taskService.getDeletedTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  restoreTask(taskId: number): void {
    this.taskService.restoreTask(taskId).subscribe(() => {
      this.loadDeletedTasks();
      this.snackBar.open('Task restored successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}