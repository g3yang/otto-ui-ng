
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { 
    Effect, 
    Actions,
    ofType
} from '@ngrx/effects';
import { Observable, fromEventPattern } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';


import * as TodoAction from '../actions/todo.action';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {


    constructor(private actions$:Actions, private service:TodoService){}

    @Effect()
    loadTodos$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.LOAD_START),
        mergeMap(()=>
            this.service.getTodos()
                .pipe( map(todos=>{
                            const newTodos  = todos.map(t=>{
                                return {
                                    id: t._id,
                                    title: t.title
                                };
                            });
                            return new TodoAction.LoadSuccess(newTodos)
                        })
                )
        )
    )

    @Effect()
    addTodo$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.ADD),
        map((action:TodoAction.Add)=> action.payload),
        mergeMap((todo)=>{
            return this.service.addTodo(todo)
                    .pipe( map(()=>{
                        return new TodoAction.LoadStart();
                    })
                )
        })
    )

    @Effect()
    deleteTodo$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.DELETE),
        map((action:TodoAction.Delete)=> action.payload),
        mergeMap((id)=>{
            return this.service.deleteTodo(id)                    
                    .pipe( map(()=>{
                        return new TodoAction.LoadStart();
                    })
                )
        })
    )

    @Effect()
    updateTodo$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.UPDATE),
        map((action:TodoAction.Update)=> action.payload),
        mergeMap((updatedTodo)=>{
            return this.service.saveTodo(updatedTodo)                    
                    .pipe( map(()=>{
                        return new TodoAction.LoadStart();
                    })
                )
        })
    )


}

