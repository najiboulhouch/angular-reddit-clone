import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn : boolean;
  username: string;
  faUser = faUser;

  constructor(private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data : boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data :string) => this.username = data);
    
    this.isLoggedIn=this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  logout(){
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigateByUrl('');
  }

  goToUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

}
