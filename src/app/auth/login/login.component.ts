import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayLoad } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isError: boolean;
  loginRequestPayLoad : LoginRequestPayLoad;
  registerSuccessMessage: string = '';

  constructor(private authService : AuthService, 
              private router : Router ,
              private activateRoute : ActivatedRoute,
              private toastr : ToastrService) {
                
    this.loginRequestPayLoad = {
      username : '',
      password : ''
    };
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username : new FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required)
    });
    this.activateRoute.queryParams.subscribe(params => {
      if(params.registred !== undefined && params.registred === 'true'){
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email ' + 
        'activate your account before you Login!';
      };
    })

  }

  login(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.loginRequestPayLoad.username = this.loginForm.get('username').value;
    this.loginRequestPayLoad.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayLoad).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }
  }
