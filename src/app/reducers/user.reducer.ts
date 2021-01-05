import { Action } from '../actions';
import { User } from './../models/user';
import * as fromUserAction from '../actions/user.action';
export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  users: User[];
}

const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  error: false,
  users: [],
};

export function userReducer(
  state = initialState,
  action: Action
): UserReducerState {
  console.log('Action Type ', action.type);
  switch (action.type) {
    case fromUserAction.UserActions.USER_LIST_REQUEST:
      return { ...state, loading: true, error: false };
    case fromUserAction.UserActions.USER_LIST_SUCCESS:
      const updatedUsers = state.users.concat(action.payload.data);
      return {
        ...state,
        error: false,
        loaded: true,
        loading: false,
        users: updatedUsers,
      };
    case fromUserAction.UserActions.USER_DELETE:
      const users = state.users.filter((user) => user.id !== action.payload.id);
      return { ...state, ...{ users } };
    case fromUserAction.UserActions.USER_UPDATE:
      const usersList = state.users.filter(
        (user) => user.id !== action.payload.data.id
      );
      const updatedUser = usersList.concat(action.payload.data);
      return { ...state, ...{ users: updatedUser } };
    case fromUserAction.UserActions.USER_LIST_ERROR:
      return { ...state, error: true, loading: false };
    case fromUserAction.UserActions.USER_ADD:
      const addedUser = state.users.concat(action.payload.data);
      return { ...state, ...{ users: addedUser } };
    default:
      return state;
  }
}

// selectors
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;
export const getError = (state: UserReducerState) => state.error;
