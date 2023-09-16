import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  private baseUrl : string  = environment.redditCloneUrl;

  constructor(private httpClient : HttpClient) { }

  getAllSubreddits() : Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>(`${this.baseUrl}/subreddit`)
  }

  createSubreddit(subredditModel : SubredditModel) : Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>(`${this.baseUrl}/subreddit` , subredditModel);
  }
}
