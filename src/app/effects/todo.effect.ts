
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
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';

@Injectable()
export class TodoEffects {


    constructor(private actions$:Actions, private service:TodoService){}

    @Effect()
    loadTodos$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.LOAD_START),
        mergeMap(()=>
            this.service.getTodos()
                .pipe(map(todos=>{                         
                    return new TodoAction.LoadSuccess(todos)
                }))
        )
    )

    @Effect()
    addTodo$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.ADD),
        map(action=>(action as TodoAction.Add).payload),        
        mergeMap((payload)=>{
            return this.service.addTodo(payload)
                    .pipe( 
                        map((todo)=>{
                            return new TodoAction.AddSuccess(todo);
                        })
                    )
        })
    )

    @Effect()
    deleteTodo$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.DELETE),
        map((action:TodoAction.Delete)=> action.id),
        mergeMap((id)=>{
            return this.service.deleteTodo(id)                    
                    .pipe( map(()=>{
                        return new TodoAction.DeleteSuccess(id);
                    })
                )
        })
    )

    @Effect()
    updateTodo$: Observable<Action> = this.actions$.pipe(
        ofType(TodoAction.ActionTypes.UPDATE_TITLE),
        mergeMap((action)=>{
            const {id, newTitle}= (action as TodoAction.UpdateTitle);
            return this.service.updateTitle(id, newTitle)                    
                    .pipe( map((todo)=>{
                        return new TodoAction.UpdateTitleSuccess(id, newTitle);
                    })
                )
        })
    )


}

