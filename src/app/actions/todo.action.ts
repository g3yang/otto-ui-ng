import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';

export enum ActionTypes {
    LOAD_START = '[Todo Load] Start',
    LOAD_SUCCESS = '[Todo Load] Success',
    
    SELECT = '[Todo] Select',

    ADD = '[Todo] Add',
    ADD_SUCCESS = '[Todo] Add Success',
    
    DELETE = '[Todo] Delete',
    DELETE_SUCCESS = '[Todo] Delete Success',

    UPDATE= '[Todo Update]',
    UPDATE_SUCCESS = '[Todo] Update Success',

    UPDATE_TITLE = '[Todo] Update Title',
    UPDATE_TITLE_SUCCESS = '[Todo] Update Title Success'
}

export class LoadStart implements Action{
    public readonly type = ActionTypes.LOAD_START;
}

export class LoadSuccess implements Action{
    public readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public todos: Todo[]) {}
}

export class Select implements Action {
    public readonly type = ActionTypes.SELECT;
    constructor(public id: string) {}
}

export class Add implements Action{
    public readonly type = ActionTypes.ADD
    constructor(public payload:Todo) {}
}

export class AddSuccess implements Action {
    public readonly type = ActionTypes.ADD_SUCCESS;
    constructor(public payload: Todo) {}
}

export class Delete implements Action {
    public readonly type = ActionTypes.DELETE;
    constructor(public id: string) {}
}

export class DeleteSuccess implements Action {
    public readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public id:string) {}
}

export class UpdateTitle implements Action {
    public readonly type = ActionTypes.UPDATE_TITLE;
    constructor(public id: string, public newTitle: string) {}
}

export class UpdateTitleSuccess implements Action {
    public readonly type = ActionTypes.UPDATE_TITLE_SUCCESS;
    constructor(public id:string, public newTitle:string) {}
}

export type Actions = LoadStart | LoadSuccess | Add | Delete ;

