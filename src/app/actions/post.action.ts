import { Post } from './../models/post';
import { Action } from './index';
export enum PostActions {
  POST_LIST_REQUEST = '[POST List] Request',
  POST_LIST_SUCCESS = '[POST List] Success',
  POST_LIST_ERROR = '[POST List] Error',
  POST_DELETE = '[POST] Delete',
  POST_UPDATE = '[POST] Update',
  POST_ADD = '[POST] add',
}

export class PostListRequestAction implements Action {
  readonly type = PostActions.POST_LIST_REQUEST;
}

export class PostListSuccessAction implements Action {
  readonly type = PostActions.POST_LIST_SUCCESS;
  constructor(public payload?: { data: Post[] }) {}
}

export class PostListErrorAction implements Action {
  readonly type = PostActions.POST_LIST_ERROR;
}

export class PostAddAction implements Action {
  readonly type = PostActions.POST_ADD;
  constructor(public payload?: { data: Post }) {}
}

export class PostUpdateAction implements Action {
  readonly type = PostActions.POST_UPDATE;
  constructor(public payload?: { data: Post }) {}
}

export class PostDeleteAction implements Action {
  readonly type: PostActions.POST_DELETE;
  constructor(public payload?: { id: number }) {}
}
