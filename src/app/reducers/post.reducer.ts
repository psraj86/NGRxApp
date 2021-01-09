import { createSelector } from '@ngrx/store';
import { StoreUtility } from './../utils/store-utility';
import * as fromPostAction from './../actions/post.action';
import { Action } from '../actions/index';
import { Post } from '../models/post';

export interface PostReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: Post };
  ids: number[];
}

export const initialState: PostReducerState = {
  loading: false,
  loaded: false,
  error: false,
  entities: {},
  ids: [],
};

export function PostReducer(
  state = initialState,
  action: Action
): PostReducerState {
  switch (action.type) {
    case fromPostAction.PostActions.POST_LIST_REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case fromPostAction.PostActions.POST_LIST_SUCCESS: {
      const posts = action.payload.data;
      const obj = StoreUtility.normalize(posts);
      const newEntities = { ...state.entities, ...posts };
      const ids = posts.map((post) => post.id);
      const newIds = StoreUtility.filterDuplicateIds(ids);
      return {
        ...state,
        ...{ loading: false, loaded: true, ids: newIds, entities: newEntities },
      };
    }
    case fromPostAction.PostActions.POST_LIST_ERROR: {
      return { ...state, loading: false, error: true };
    }

    default:
      return state;
  }
}

// selectors
export const getLoading = (state: PostReducerState) => state.loading;
export const getLoaded = (state: PostReducerState) => state.loaded;
export const getError = (state: PostReducerState) => state.error;
export const getEntities = (state: PostReducerState) => state.entities;
export const getIds = (state: PostReducerState) => state.ids;
export const getPosts = createSelector(getEntities, (entities) => StoreUtility.unNormalized(entities));
