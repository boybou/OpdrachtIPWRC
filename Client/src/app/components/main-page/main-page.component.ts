import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../shared/AuthorizationService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private authService:AuthorizationService,private router:Router) { }

  ngOnInit() {
    this.authService.retrieveAuthorizationServiceFromCookie();
    if(AuthorizationService.goodCookie && !AuthorizationService.isLoggedIn){
      this.router.navigate(['/login'])
    }
  }

}
