import { User } from './../models/user';
export enum UserActions {
  USER_LIST_REQUEST = '[User List] Request',
  USER_LIST_SUCCESS = '[User List] Success',
  USER_LIST_ERROR = '[User List] Error',
  USER_DELETE = '[User] Delete',
  USER_UPDATE = '[User] Update',
  USER_ADD = '[User] add'
}

export class UserListRequestAction {
  readonly type = UserActions.USER_LIST_REQUEST;
}
export class UserListSuccessAction {
  readonly type = UserActions.USER_LIST_SUCCESS;
  constructor(public payload?: { data: User[] }) {}
}
export class UserListErrorAction {
  readonly type = UserActions.USER_LIST_ERROR;
}
export class UserListDeleteAction {
  readonly type = UserActions.USER_DELETE;
  constructor(public payload?: { id: number }) {}
}
export class UserUpdateAction {
  readonly type = UserActions.USER_UPDATE;
  constructor(
    public payload?: { data: User }
  ) {}
}
export class UserAddAction {
  readonly type = UserActions.USER_ADD;
  constructor(
    public payload?: { data: User }
  ) {}
}
