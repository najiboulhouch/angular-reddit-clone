import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { faArrowUp , faArrowDown , faComments} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  posts : Array<PostModel> = [];
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;


  constructor(private postService : PostService) {
    this.listPosts();
   }

  ngOnInit(): void {
  }

  listPosts() {
      this.handleListPosts();
  }

  private handleListPosts() {
    this.postService.getPostListPaginate(this.thePageNumber - 1, this.thePageSize).subscribe(
      this.processResult());
  }

  processResult(){
    return (data : any) => {
      this.posts = data.content ;
      this.thePageSize = data.size;
      this.thePageNumber = data.number + 1;
      this.theTotalElements = data.totalElements;
    }
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listPosts();
  }

}
