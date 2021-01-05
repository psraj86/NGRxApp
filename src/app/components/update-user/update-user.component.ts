import { ApiRepositoryService } from 'src/app/services/api-repository.service';
import { User } from 'src/app/models/user';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiRepositoryService: ApiRepositoryService
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      email: [this.data ? this.data.email : null, [Validators.required]],
      name: [this.data ? this.data.name : null, [Validators.required]],
    });
  }

  addOrUpdate() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.apiRepositoryService.addUser(this.userForm.value);
    this.dialogRef.close();
  }

  updateUser() {
    const updatedUser: User = { ...this.data, ...this.userForm.value };
    this.apiRepositoryService.updateUser(updatedUser);
    this.dialogRef.close();
  }
}
