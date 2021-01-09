import { ApiService } from './api.service';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  getUserLoaded,
  getUserLoading,
  getUsers,
  getUserError,
  RootReducerState,
  getUserById,
  getPosts,
  getPostLoaded,
  getPostLoading,
  getPostError,
} from '../reducers';
import * as fromUserAction from './../actions/user.action';
import * as fromPostAction from './../actions/post.action';
import { User } from '../models/user';
import { take } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class ApiRepositoryService {
  constructor(
    private store: Store<RootReducerState>,
    private apiService: ApiService
  ) {}

  getUserList(
    force = false
  ): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUsers$ = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);

    combineLatest([loading$, loaded$])
      .pipe(take(1))
      .subscribe((res) => {
        if ((!res[0] && !res[1]) || force) {
          this.store.dispatch(new fromUserAction.UserListRequestAction());
          this.apiService.getAllUsers().subscribe(
            (data) => {
              this.store.dispatch(
                new fromUserAction.UserListSuccessAction({ data })
              );
            },
            (error) => {
              this.store.dispatch(new fromUserAction.UserListErrorAction());
            }
          );
        }
      });
    return [loading$, getUsers$, getError$];
  }

  deleteUser(id: number) {
    // first we will call actual delete api.
    this.store.dispatch(new fromUserAction.UserListDeleteAction({ id }));
  }

  updateUser(data: User) {
    // first send details to actual API
    this.store.dispatch(new fromUserAction.UserUpdateAction({ data }));
  }

  addUser(data: User) {
    this.store.dispatch(new fromUserAction.UserAddAction({ data }));
  }

  getUserById(id: number, force = false) {
    // get user from the reducer otherwise form the api
    const user$ = this.store.select((state) => getUserById(state, id));
    user$.pipe(take(1)).subscribe((res) => {
      if (force || !res) {
        return this.apiService.getUser(id).subscribe((data) => {
          this.store.dispatch(new fromUserAction.UserUpdateAction({ data }));
        });
      }
      return res;
    });
    return user$;
  }

  getAllPost(
    force = false
  ): [Observable<boolean>, Observable<Post[]>, Observable<boolean>] {
    const posts$ = this.store.select(getPosts);
    const loaded$ = this.store.select(getPostLoaded);
    const loading$ = this.store.select(getPostLoading);
    const error$ = this.store.select(getPostError);
    combineLatest([loading$, loaded$])
      .pipe(take(1))
      .subscribe((res) => {
        if ((!res[0] && !res[1]) || force) {
          this.store.dispatch(new fromPostAction.PostListRequestAction());
          this.apiService.getAllPost().subscribe((data) => {
            this.store.dispatch(new fromPostAction.PostListSuccessAction({ data }));
          }, (error) => {
            this.store.dispatch(new fromPostAction.PostListErrorAction());
          });
        }
      });
    return [loading$, posts$, error$];
  }
}
