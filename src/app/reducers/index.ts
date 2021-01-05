import * as fromUserReducer from './user.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface RootReducerState {
  users: fromUserReducer.UserReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUserReducer.userReducer,
};

// selectors
export const getUserState = (state: RootReducerState) => state.users;

// create selector
export const getUserLoaded = createSelector(
  getUserState,
  fromUserReducer.getLoaded
);
export const getUserLoading = createSelector(
  getUserState,
  fromUserReducer.getLoading
);
export const getUsers = createSelector(getUserState, fromUserReducer.getUsers);
export const getUserError = createSelector(getUserState, fromUserReducer.getError);
