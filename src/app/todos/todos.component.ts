import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos = [];
  displayedColumns=['title','delete'];
  newTodoForm:FormGroup;
  dataSource = new MatTableDataSource();

  constructor(private router: Router, private todoService:TodoService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(data=>{
      this.dataSource.data = data;
    });
  }

  delete(id){
    console.log('To delete '+id);
    this.todoService.deleteTodo(id);
    this.todoService.getTodos().subscribe(data=>{
      console.log(data);
      this.dataSource.data = data;
    });
    
  }
}
