import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    todos;
    currId;
    constructor(){
        this.todos=[
            {   id: 1,
                title: 'Learn NodeJS',
                description: 'Learn Nodejs within the following 8 months!'
            }
        ];
        
        this.currId = 2; 
    }

    getTodos(){
        return of(this.todos);
    }

    addTodo(newTodo){
        newTodo.id = this.currId;
        this.currId ++;
        this.todos.push(newTodo);
        return of(newTodo);
    }

    getTodo(id){
        const todo = this.todos.find((t)=>{
            return t.id == id;
        });
        return of(todo);
    }
}