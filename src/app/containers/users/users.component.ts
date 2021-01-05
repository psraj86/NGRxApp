import { UpdateUserComponent } from './../../components/update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiRepositoryService } from 'src/app/services/api-repository.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: boolean;
  constructor(
    private apiRepositoryService: ApiRepositoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    const observer$ = this.apiRepositoryService.getUserList();
    const getUsers$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];
    getUsers$.subscribe((data) => {
      this.users = data;
    });
    loading$.subscribe((data) => {
      this.loading = data;
    });
    error$.subscribe((data) => {
      this.error = data;
      console.log('Loading Error Error ', data);
    });
  }

  tryAgain() {
    this.apiRepositoryService.getUserList(true);
  }

  addUser() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px',
    });
  }
}
