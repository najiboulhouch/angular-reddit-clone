import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentPayLoad } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: PostModel[];
  comments: CommentPayLoad[];
  postLength: number;
  commentLength: number;



  constructor(private router : Router , private activateRoute : ActivatedRoute,
              private postService : PostService , private commentService : CommentService) {
                
                this.name = this.activateRoute.snapshot.params.name;
                this.postService.getAllPostsByUser(this.name).subscribe(data => {
                  this.posts = data;
                  this.postLength = data.length;
                });

                this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
                  this.comments = data ; 
                  this.commentLength = data.length;
                })
               }

  ngOnInit(): void {
  }

  goToPost(id : number){
    this.router.navigateByUrl('/view-post/' + id);
  }

}
