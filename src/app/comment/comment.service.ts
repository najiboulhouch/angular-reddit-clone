import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayLoad } from './comment.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl : string  = environment.redditCloneUrl;

  constructor(private httpClient : HttpClient) { }

  getAllCommentsForPost(postId : number): Observable<CommentPayLoad[]>{
    return this.httpClient.get<CommentPayLoad[]>(`${this.baseUrl}/comments/?postId=${postId}`);
  }

  postComment(commentPayLoad : CommentPayLoad): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/comments/` , commentPayLoad)
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayLoad[]>(`${this.baseUrl}/comments/by-user/${name}`);
  }
}
