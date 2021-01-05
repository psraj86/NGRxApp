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
} from '../reducers';
import * as fromUserAction from './../actions/user.action';
import { User } from '../models/user';
import { take } from 'rxjs/operators';

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
}
