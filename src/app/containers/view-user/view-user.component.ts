import { User } from 'src/app/models/user';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { ApiRepositoryService } from 'src/app/services/api-repository.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  isAlive = true;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private apiRepositoryService: ApiRepositoryService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((data) => {
    //   this.apiRepositoryService.getUserById(data.id).subscribe((user) => {
    //     console.log(user);
    //   });
    // });
    const user$ = this.route.params.pipe(
      map(data => data.id),
      takeWhile(() => this.isAlive),
      switchMap(id => this.apiRepositoryService.getUserById(id)),
      filter(res => !!res)
    );
    user$.subscribe(data => {
      this.user = data;
    });
  }
  ngOnDestroy(){
    this.isAlive = false;
  }
}
