import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../shared/AuthorizationService";
import {ApiService} from "../../shared/ApiService";
import {User} from "../../models/User";
import {StaticUris} from "../../shared/StaticUris";
import {Router} from "@angular/router";
import {ResponseUtil} from "../../shared/ResponseUtil";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email:string = "";
  private password:string = "";
  private response:string = "";

  constructor(private authService:AuthorizationService,private apiService:ApiService,private router:Router,private responseUtil:ResponseUtil) { }

  ngOnInit() {
    if(AuthorizationService.isLoggedIn){
      this.logout();
    }
    else if(AuthorizationService.goodCookie){
      this.handleLogin();
    }
  }

  public login(){
    this.authService.setHeader(this.email,this.password);
    this.handleLogin()
  }

  public logout(){
    this.authService.deleteAuthorization();
    AuthorizationService.goodCookie = false;
    this.router.navigate(['/']);
  }

  private handleLogin(){
    this.apiService.get<User>(StaticUris.getSelf).subscribe( data =>{
      this.loggedIn(data);

    },error => {
     this.response = this.responseUtil.badResponse("verkeerde credentials");
    })
  }

  private loggedIn(user){
    AuthorizationService.activeUser = user;
    AuthorizationService.isLoggedIn = true;
    this.authService.storeAuthorizationServiceToCookie();
    this.router.navigate(['/shop']);
  }

}
