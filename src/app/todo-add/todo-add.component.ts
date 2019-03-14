import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  constructor(private router: Router, private todoService:TodoService, private formBuilder:FormBuilder) { }
  newTodoForm:FormGroup;

  ngOnInit() {
    this.newTodoForm = this.formBuilder.group({
      'title':[null],
      'description': [null]
    });
  }

  onFormSubmit(){
    this.todoService.addTodo(this.newTodoForm.value).subscribe(
      data=>{
        this.router.navigate(['todos']);
      }
    );
  }

}
