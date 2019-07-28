import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { TodoAddComponent} from './todo-add/todo-add.component';
import { TodoEditComponent} from './todo-edit/todo-edit.component';
const routes: Routes = [
  { path: 'login',
    component: LoginComponent   
  },
  {
    path: 'todos',
    component: TodosComponent
  },{
    path:'todo-add',
    component: TodoAddComponent
  },
  {
    path: 'todo-edit/:id',
    component: TodoEditComponent,
    data: { title: 'Edit Todo' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
