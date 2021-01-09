import { takeWhile } from 'rxjs/operators';
import { ApiRepositoryService } from 'src/app/services/api-repository.service';
import { Post } from './../../models/post';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private apiRepositoryService: ApiRepositoryService) {}
  loading = false;
  error = false;
  postList: Post[] = [];
  isAlive = true;
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    const [loading$, posts$, error$] = this.apiRepositoryService.getAllPost();
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => { this.loading = data; });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => { this.error = data; });
    posts$.pipe(takeWhile(() => this.isAlive)).subscribe(res => { this.postList = res; });
  }
}
