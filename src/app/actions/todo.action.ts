import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';

export enum ActionTypes {
    LOAD_START = '[Todo Load] Start',
    LOAD_SUCCESS = '[Todo Load] Success',
    ADD = '[Todo Add]',
    DELETE = '[Todo Delete]',
    UPDATE= '[Todo Update]'
}

export class LoadStart implements Action{
    public readonly type = ActionTypes.LOAD_START;
}

export class LoadSuccess implements Action{
    public readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Todo[]) {}
}

export class Add implements Action{
    public readonly type = ActionTypes.ADD
    constructor(public payload:Todo) {}
}

export class Delete implements Action {
    public readonly type = ActionTypes.DELETE;
    constructor(public payload:string) {}
}

export class Update implements Action {
    public readonly type = ActionTypes.UPDATE;
    constructor(public payload:Todo){}
}


export type Actions = LoadStart | LoadSuccess | Add | Delete | Update;

