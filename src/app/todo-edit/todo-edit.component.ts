import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as RootReducer from '../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoAction from '../actions/todo.action';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  todoForm: FormGroup;
  id;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, 
            private api: TodoService, private store: Store<RootReducer.State>) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todoForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required], 
    });
    this.loadTodo();    
  }

  loadTodo(){
    this.api.getTodo(this.id).subscribe(data=>{
      this.todoForm.setValue({
        title: data.title,
        description: data.description
      });
    })
  }

  save(){
    this.store.dispatch(new TodoAction.Update({
      id:this.id, 
      ...this.todoForm.value
    }));
    this.router.navigate(['/todos']);
  }

}
