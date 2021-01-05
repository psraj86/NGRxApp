import { UpdateUserComponent } from './../update-user/update-user.component';
import { ApiRepositoryService } from 'src/app/services/api-repository.service';
import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    private apiRepositoryService: ApiRepositoryService,
    private dialog: MatDialog
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
}
