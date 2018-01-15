import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {AuthorizationService} from "./shared/AuthorizationService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public static cookieService:CookieService;
  constructor(cookieService:CookieService,private router:Router){
    AppComponent.cookieService = cookieService;
  }

  ngOnInit() {
  }

  // private isLogginIn(){
  //   if(this.router.url == "/login"){
  //     return true;
  //   }
  //   return false;
  // }




}
