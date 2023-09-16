import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommentPayLoad } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId : number;
  post : PostModel;
  commentForm : FormGroup;
  commentPayload : CommentPayLoad;
  comments : CommentPayLoad[];

  constructor(private postService : PostService, private activateRoute : ActivatedRoute , 
              private commentService : CommentService , private authService : AuthService) {
      this.postId = this.activateRoute.snapshot.params.id;
      this.commentForm = new FormGroup({
        text : new FormControl('' , Validators.required)
      });

      this.commentPayload = {
        text : '',
        postId : this.postId,
        username : authService.getUsername(),
      };
     }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  getPostById(){
    this.postService.getPost(this.postId).subscribe(data => {
      console.log(data);
      this.post = data ;
    } , error => {
      throwError(error);
    });
  }

  getCommentsForPost(){
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data ;
    } , error => {
      throwError(error);
    });
  }

  postComment(){
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.reset();
      this.getCommentsForPost();
    } , error => {
      throwError(error);
    })
  }
  

}
