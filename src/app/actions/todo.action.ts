import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';

export enum ActionTypes {
    LOAD_START = '[Todo Load] Start',
    LOAD_SUCCESS = '[Todo Load] Success'
}

export class LoadStart implements Action{
    public readonly type = ActionTypes.LOAD_START;
}

export class LoadSuccess implements Action{
    public readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Todo[]) {}
}


export type Actions = LoadStart | LoadSuccess;

