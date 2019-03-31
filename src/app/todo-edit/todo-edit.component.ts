import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService} from '../services/todo.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  todoForm: FormGroup;
  id;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, 
            private api: TodoService) { }

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
    this.api.saveTodo({
      id:this.id, 
      ...this.todoForm.value
    }).subscribe(
      val=>{
        console.log(val);
        this.router.navigate(['/todos']);
      }
    );
    
  }

}
