import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayLoad } from '../post/create-post/create-post.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl : string  = environment.redditCloneUrl;

  constructor(private httpClient : HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>>{
    return this.httpClient.get<Array<PostModel>>(`${this.baseUrl}/posts`);
  }

    
  createPost(postPayload: CreatePostPayLoad) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/posts` , postPayload);
  }

  getPost(postId: number) : Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${this.baseUrl}/posts/${postId}`);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(`${this.baseUrl}/posts/by-user/${name}`);
  }

  getPostListPaginate(thePage: number, thePageSize: number): Observable<Array<PostModel>> {
    const searchUrl = `${this.baseUrl}/posts?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<Array<PostModel>>(searchUrl);
  }
  
}
