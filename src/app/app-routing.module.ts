import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LoginComponent} from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { TodoAddComponent} from './todo-add/todo-add.component';
import { TodoEditComponent} from './todo-edit/todo-edit.component';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add Product' }
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
