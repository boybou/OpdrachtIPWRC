import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../shared/AuthorizationService";
import {ApiService} from "../../shared/ApiService";
import {StaticUris} from "../../shared/StaticUris";
import {User} from "../../models/User";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";
import {BasketService} from "../../shared/BasketService";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private sesamCounter:number = 0;
  private user:User;
  private hover:boolean = false;



  constructor(private api:ApiService,private authService:AuthorizationService,private router:Router,private basketService:BasketService) {

  }

  private changeHoverState(){
    if(this.hover) {
      this.hover = false;
    }
    else {
      this.hover =  true;
    }
  }

  private isLoggedIn(){
    return AuthorizationService.isLoggedIn;
  }

  private isUser(){
    if(AuthorizationService.activeUser != null){
      this.user = AuthorizationService.activeUser;
      return true;
    }
    return false;
  }

  private getUser(){
    this.api.get<User>(StaticUris.getSelf).subscribe(data =>{
      this.user = data;
    })
  }

  ngOnInit() {

  }

  private sesamOpenNu(){
    this.sesamCounter++
    if (this.sesamCounter % 5 == 0){
      this.api.get<User>(StaticUris.getSelf).subscribe( data =>{
        let user:User = data;
        if(user.role == "admin"){
          AppComponent.sesamOpen = true;
        }
        else if(user.role == "klant"){
          console.log("de poort gaat niet open voor klanten");
        }
      },error =>{
        console.log("de poort gaat niet open voor iemand die zijn identiteit verbergt")
      })
    }
  }

  private sesamDicht(){
    AppComponent.sesamOpen = false;
  }

  private logout(){
    this.sesamDicht();
    this.basketService.deleteCookie();
  }


}
