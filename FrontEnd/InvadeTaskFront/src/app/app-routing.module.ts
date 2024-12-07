import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './Guards/auth.guard';
import { ListComponent } from './List/list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { RestoreTaskComponent } from './restore-task/restore-task.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/add', component: AddTaskComponent , canActivate: [AuthGuard]},
  { path: 'tasks/update/:id', component: UpdateTaskComponent, canActivate: [AuthGuard] },
  { path: 'tasks/delete/:id', component: DeleteTaskComponent, canActivate: [AuthGuard] },
  { path: 'Recycle' , component: RestoreTaskComponent, canActivate: [AuthGuard]},
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: AddCategoryComponent },
  { path: 'categories/edit/:id', component: EditCategoryComponent },
  { path: 'categories/delete/:id', component: DeleteCategoryComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }