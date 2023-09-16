import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayLoad } from './vote-button/vote-payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl : string  = environment.redditCloneUrl;

  constructor(private httpClient : HttpClient) { }

  vote(votePayload : VotePayLoad) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/votes/` , votePayload);
  }
  
}
