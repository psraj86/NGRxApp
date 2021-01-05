import { HttpService } from './http.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

  getAllUsers(): Observable<User[]>{
    return this.httpService.get('/users').pipe(
      map((data: User[]) => data)
    );
  }

}