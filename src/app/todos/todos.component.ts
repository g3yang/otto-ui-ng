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
  ds = new MatTableDataSource();


  constructor(private router: Router, private todoService:TodoService, private formBuilder:FormBuilder, private store: Store<fromRoot.State>) { 
  }

  ngOnInit(){
    this.store.dispatch(new TodoActions.LoadStart());
    this.store.select(RootReducer.getTodos).subscribe(todos=>{
      this.ds.data = todos;
    });
  }

  delete(id){
    console.log(`delete ${id}`);
    this.store.dispatch(new TodoActions.Delete(id));
  }
}
