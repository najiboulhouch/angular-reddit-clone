import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayLoad } from '../login/login-request.payload';
import { LoginResponse } from '../login/request-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string  = environment.redditCloneUrl;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) { }

  signup(signupRequestPayload : SignupRequestPayload) : Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/auth/signup` , signupRequestPayload, {responseType : 'text'});
  }

  login(loginRequestPayload : LoginRequestPayLoad) : Observable<boolean>{
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`, 
    loginRequestPayload).pipe(map(data => {
        this.localStorage.store('authenticationToken' , data.authenticationToken);
        this.localStorage.store('username' , data.username);
        this.localStorage.store('refreshToken' , data.refreshToken);
        this.localStorage.store('expiresAt' , data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
    }));
  }

  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername(){
    return this.localStorage.retrieve('username');
  }

  refreshToken(){
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/refresh/token`,
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }

    this.httpClient.post(`${this.baseUrl}/auth/logout`, this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        //console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

}
