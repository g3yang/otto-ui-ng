import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import _ from 'lodash';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import * as TodoActions from '../actions/todo.action';
import * as RootReducer from '../reducers/index'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
 
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


  constructor(private router: Router, private todoService:TodoService, 
            private formBuilder:FormBuilder, private store: Store<fromRoot.State>,
            public dialog: MatDialog) { 
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

  select(id){
    console.log(`select ${id}`);
    this.store.dispatch(new TodoActions.Select(id));
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: '250px',
    }); 
  }

}
