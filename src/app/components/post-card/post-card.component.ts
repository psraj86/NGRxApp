import { Post } from './../../models/post';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  constructor() { }

  ngOnInit(): void {
  }

}
