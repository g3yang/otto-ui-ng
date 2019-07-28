import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as RootReducer from '../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoAction from '../actions/todo.action';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromRoot from 'src/app/reducers';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  todoForm: FormGroup;
  id;

  constructor( private formBuilder: FormBuilder, 
             private api: TodoService, private store: Store<RootReducer.State>,
             public dialogRef: MatDialogRef<TodoEditComponent>) { }

  ngOnInit() {
     this.todoForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' :[null, Validators.required], 
    });

    this.store.select(fromRoot.getSelectedTodo).subscribe(todo=>{
      this.id = todo._id;
      this.todoForm.controls['title'].setValue(todo.title);
      this.todoForm.controls['description'].setValue(todo.description);
    })
  }

  save(){
    const newTitle = this.todoForm.get('title').value;
    this.store.dispatch(new TodoAction.UpdateTitle(this.id, newTitle));
    this.dialogRef.close();
  }

}
