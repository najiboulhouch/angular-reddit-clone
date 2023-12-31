import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm : FormGroup ; 
  subredditModel : SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router : Router , private subredditService : SubredditService) {
    this.createSubredditForm = new FormGroup({
      title : new FormControl('' , Validators.required),
      description : new FormControl('' , Validators.required) 
    });

    this.subredditModel = {
      name : '',
      description : ''
    };
   }

  ngOnInit(): void {

  }

  discard(){
    this.router.navigateByUrl('/');
  }

  createSubreddit(){
    
    if (this.createSubredditForm.invalid) {
      this.createSubredditForm.markAllAsTouched();
      return;
    }

    this.subredditModel.name = this.createSubredditForm.get('title').value;
    this.subredditModel.description = this.createSubredditForm.get('description').value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    } , error => {
      throwError(error);
    });
  }

}
