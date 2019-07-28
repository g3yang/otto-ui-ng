import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import _ from 'lodash';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
const apiRoot = "http://localhost:3000/todos";


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    todos;
    currId;
    constructor(private http: HttpClient){
        this.todos=[
            {   id: 1,
                title: 'Learn NodeJS',
                description: 'Learn Nodejs within the following 8 months!'
            }
        ];
        
        this.currId = 2; 
    }

    getTodos(){
        return this.http.get<any>(apiRoot, httpOptions);
    }

    deleteTodo(id){
        const url = `${apiRoot}/${id}`;
        return this.http.delete<any>(url, httpOptions).pipe(tap(
            console.log
        ));
    }


    addTodo(newTodo){
        return this.http.post<any>(apiRoot, newTodo,httpOptions).pipe(tap(
            console.log
        ));
    }

    getTodo(id){
        const url = `${apiRoot}/${id}`;
        return this.http.get<any>(url).pipe(tap(
            console.log
        ));
    }


    updateTitle(id, newTitle) {
        const update = { title: newTitle};
        const url = `${apiRoot}/${id}`;
        return this.http.put<any>(url, update);
    }

    
}