import * as fromTodos from './todo.reducer';
import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';


export interface State{
    todo: fromTodos.State 
};

export const reducers = {
    todo: fromTodos.reducer
};
/**
export function reducer(state: any, action: any) {
    return combineReducers(reducers);
}
*/

export const getTodoState = (state)=>state.todo;

export const getTodos = createSelector(getTodoState, fromTodos.getTodos);