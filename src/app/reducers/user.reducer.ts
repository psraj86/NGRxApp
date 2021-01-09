import { createSelector } from '@ngrx/store';
import { Action } from '../actions';
import { User } from './../models/user';
import * as fromUserAction from '../actions/user.action';
import { StoreUtility } from '../utils/store-utility';
export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  // users: User[];
  entities: { [id: number]: User };
  ids: number[];
}

const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  error: false,
  // users: [],
  entities: {},
  ids: [],
};

export function userReducer(
  state = initialState,
  action: Action
): UserReducerState {
  switch (action.type) {
    case fromUserAction.UserActions.USER_LIST_REQUEST:
      return { ...state, loading: true, error: false };
    case fromUserAction.UserActions.USER_LIST_SUCCESS: {
      const users = action.payload.data;
      const obj = StoreUtility.normalize(users);
      const newEntities = { ...state.entities, ...obj };
      const ids = users.map((user) => user.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state,
        ...{
          loaded: true,
          loading: false,
          error: false,
          entities: newEntities,
          ids: newIds,
        },
        // error: false,
        // loaded: true,
        // loading: false,
        // users: updatedUsers,
      };
    }
    case fromUserAction.UserActions.USER_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((element) => element !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      // const users = state.users.filter((user) => user.id !== action.payload.id);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    case fromUserAction.UserActions.USER_UPDATE: {
      // const usersList = state.users.filter(
      //   (user) => user.id !== action.payload.data.id
      //   );
      //   const updatedUser = usersList.concat(action.payload.data);
      //   return { ...state, ...{ users: updatedUser } };
      const user = action.payload.data;
      const entity = { [user.id]: user };
      const updatedEntity = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updatedEntity } };
    }
    case fromUserAction.UserActions.USER_LIST_ERROR: {
      return { ...state, error: true, loading: false };
    }
    case fromUserAction.UserActions.USER_ADD: {
      const user = action.payload.data;
      const entity = { [user.id]: user };
      const newEntities = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return { ...state, ...{ ids: newIds, entities: newEntities } };
    }
    default:
      return state;
  }
}

// selectors
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getEntities = (state: UserReducerState) => state.entities;
export const getIds = (state: UserReducerState) => state.ids;
export const getUsers = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: UserReducerState) => state.error;
