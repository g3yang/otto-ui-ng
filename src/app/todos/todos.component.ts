import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import _ from 'lodash';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from '../actions/todo.action';
import { Todo } from '../models/todo';
import * as RootReducer from '../reducers/index'
 
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos = [];
  displayedColumns=['title','delete'];
  newTodoForm:FormGroup;
  todos$: Observable<Todo[]>;

  constructor(private router: Router, private todoService:TodoService, private formBuilder:FormBuilder, private store: Store<fromRoot.State>) { 
  }

  ngOnInit(){
    this.store.dispatch(new TodoActions.LoadStart());
    this.todos$ = this.store.select(RootReducer.getTodos);
  }

  delete(id){
    this.store.dispatch(new TodoActions.Delete(id));
    this.todos$ = this.store.select(RootReducer.getTodos);
  }

  foo(){
    const div = document.getElementById('foo');
    const dom = document.createElement('div');
    dom.innerHTML ="<h1>DIU</h1>";
    //dom.innerHTML = "<app-todo-add></app-todo-add>";
    div.append(dom);
  }
}
