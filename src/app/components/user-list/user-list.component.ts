import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  constructor() { }

  ngOnInit(): void {
  }

}
