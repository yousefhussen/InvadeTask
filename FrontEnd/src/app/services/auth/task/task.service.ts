import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Category } from '../../../Models/Task';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  getDeletedTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/trash/deleted/`);
  }
  getTask(taskId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/${taskId}`);
  }
  private apiUrl: string = environment.apiUrl+'/api';

  constructor(private http: HttpClient) {}

  getAllTasks(page: number, search: string, filters: any ,sort_by :string , sort_order :string): Observable<Task[]> {
    const params: any = { page, search,sort_by: sort_by,sort_order: sort_order, ...filters };
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { params });
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks` , task);
  }

  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }

  forceDeleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}/force-delete`);
  }

  restoreTask(taskId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/${taskId}/restore`, {});
  }

  addCategory(categoryName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, { name: categoryName });
  }
}