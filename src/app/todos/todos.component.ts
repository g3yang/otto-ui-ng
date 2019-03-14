import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos = [];
  displayedColumns=['title'];
  newTodoForm:FormGroup;
  constructor(private router: Router, private todoService:TodoService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(data=>{
      this.todos =data;
    });
  }
}
