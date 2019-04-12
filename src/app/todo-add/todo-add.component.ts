import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as RootReducer from '../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoAction from '../actions/todo.action';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  newTodoForm:FormGroup;
  constructor(private router: Router, private todoService:TodoService, private formBuilder:FormBuilder, private store: Store<RootReducer.State>) { }
  

  ngOnInit() {
    this.newTodoForm = this.formBuilder.group({
      'title':[null],
      'description': [null]
    });
  }

  onFormSubmit(){
    const newTodo = this.newTodoForm.value;
    this.store.dispatch(new TodoAction.Add(newTodo));
    this.router.navigate(['todos']);
  }

}
