
//import {Todo} from '../models/todo';
import * as TodoActions from '../actions/todo.action'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from 'src/app/interfaces/todo';


export interface State extends EntityState<Todo>{
    selectedTodoId: string | null;
}

const selectTodoId = (todo: Todo) => todo._id;


export const adapter:EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: selectTodoId
});

export const initialState:State = adapter.getInitialState({
    selectedTodoId: null
});

export function reducer(state=initialState, action){
    switch(action.type){
        case TodoActions.ActionTypes.LOAD_SUCCESS:
            return adapter.addAll(action.todos, state); 
        case TodoActions.ActionTypes.ADD_SUCCESS:
            return adapter.addOne(action.payload, state);
        case TodoActions.ActionTypes.DELETE_SUCCESS:
            return adapter.removeOne(action.id, state);
        case TodoActions.ActionTypes.UPDATE_TITLE_SUCCESS:
            const update = {
                id: action.id,
                changes: {
                    title: action.newTitle
                }
            }
            return adapter.updateOne( update, state);
        case TodoActions.ActionTypes.SELECT:
            return {
                ...state,
                selectedTodoId: action.id
            };
        default:
            return state;
    }
}

const {selectAll} = adapter.getSelectors();

export const getAllTodos = selectAll;

export const getSelectedTodo = (state:State)=>{
    return state.entities[state.selectedTodoId];
}
