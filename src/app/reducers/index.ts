import * as fromPostReducer from './post.reducer';
import * as fromUserReducer from './user.reducer';

import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface RootReducerState {
  users: fromUserReducer.UserReducerState;
  posts: fromPostReducer.PostReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUserReducer.userReducer,
  posts: fromPostReducer.PostReducer
};

// selectors
export const getUserState = (state: RootReducerState) => state.users;
// create selector
export const getUserLoaded = createSelector(getUserState, fromUserReducer.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUserReducer.getLoading);
export const getUserEntities = createSelector(getUserState, fromUserReducer.getEntities);
export const getUsers = createSelector(getUserState, fromUserReducer.getUsers);
export const getUserError = createSelector(getUserState, fromUserReducer.getError);
export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};

// post selectors
export const getPostState = (state: RootReducerState) => state.posts;
export const getPostLoaded = createSelector(getPostState, fromPostReducer.getLoaded);
export const getPostLoading = createSelector(getPostState, fromPostReducer.getLoading);
export const getPostEntities = createSelector(getPostState, fromPostReducer.getEntities);
export const getPosts = createSelector(getPostState, fromPostReducer.getPosts);
export const getPostError = createSelector(getPostState, fromPostReducer.getError);
