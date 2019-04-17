import * as fromTodos from './todo.reducer';
import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';


export interface State{
    todo: fromTodos.State 
    lang: string;
};

export const reducers = {
    todo: fromTodos.reducer,
    lang: (state='en', action)=>{
        switch (action.type){
            case 'CHANGE_LANG':
                return action.payload;
            default:
                return state;
        }
    }
};
/**
export function reducer(state: any, action: any) {
    return combineReducers(reducers);
}
*/

export const getTodoState = (state)=>state.todo;

export const getTodos = createSelector(getTodoState, fromTodos.getTodos);

export const getLang = (state)=>state.lang;