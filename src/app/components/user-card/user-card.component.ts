import { UpdateUserComponent } from './../update-user/update-user.component';
import { ApiRepositoryService } from 'src/app/services/api-repository.service';
import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    private apiRepositoryService: ApiRepositoryService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  delete(id: number) {
    this.apiRepositoryService.deleteUser(id);
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px',
      data: this.user,
    });
  }

  open() {
    this.router.navigate(['user', this.user.id])
  }
}
