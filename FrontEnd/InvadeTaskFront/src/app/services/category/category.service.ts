import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  updateCategory(categoryId: number, category: any) {
    return this.http.put(`${this.apiUrl}/categories/${categoryId}`, category);
  }
  getCategory(categoryId: number) {
     return this.http.get(`${this.apiUrl}/categories/${categoryId}`);
  }
  addCategory(category: any) {
    return this.http.post(`${this.apiUrl}/categories`, category);
  }
  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.apiUrl}/categories/${categoryId}`);
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  private apiUrl: string = environment.apiUrl+'/api';

  constructor(private http: HttpClient) {}
}
