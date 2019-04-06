
import {Todo} from '../models/todo';
import * as TodoActions from '../actions/todo.action'

export interface State {
    todos: Todo[];
}

const initialState: State = {
    todos: []
};

export function reducer(state=initialState, action:TodoActions.Actions){
    switch(action.type){
        case TodoActions.ActionTypes.LOAD_START:
            return state;
        case TodoActions.ActionTypes.LOAD_SUCCESS:
            return {
                todos: action.payload
            }
        default:
            return state;


    }
}

export const getTodos = (state)=>state.todos;
