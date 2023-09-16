import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayLoad } from './vote-payload';
import { VoteType } from './vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post : PostModel;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor : string ;
  downvoteColor : string ;
  votePayLoad : VotePayLoad;
  
  constructor(private voteService : VoteService , private authService : AuthService ,
             private postService : PostService , private toastr : ToastrService) { 
              this.votePayLoad = {
                voteType : undefined,
                postId : undefined
              }
             }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost(){
    this.votePayLoad.voteType = VoteType.UPVOTE;
    this.vote();

  }

  downvotePost(){
    this.votePayLoad.voteType = VoteType.DOWNTYPE;
    this.vote();
  }

  private vote(){
    this.votePayLoad.postId = this.post.id;
    this.voteService.vote(this.votePayLoad).subscribe(() => {
      this.updateVoteDetails();
    } , error => {
      this.toastr.error(error.error.message);
      throwError(error);
    })
  }

  private updateVoteDetails(){
    this.postService.getPost(this.post.id).subscribe(data => {
      this.post = data ;
    });
  }

}
