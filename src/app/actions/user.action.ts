import { User } from './../models/user';
export enum UserActions {
  USER_LIST_REQUEST = '[User List] Request',
  USER_LIST_SUCCESS = '[User List] Success',
  USER_LIST_ERROR = '[User List] Error',
}

export class UserListRequestAction {
  readonly type = UserActions.USER_LIST_REQUEST;
}
export class UserListSuccessAction {
  readonly type = UserActions.USER_LIST_SUCCESS;
  constructor(public payload?: { data: User[] }){}
}
export class UserListErrorAction {
  readonly type = UserActions.USER_LIST_ERROR;
}
