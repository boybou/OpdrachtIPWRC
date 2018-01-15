

import {HttpHeaders} from "@angular/common/http";

import {AppComponent} from "../app.component";
import {OnInit} from "@angular/core";

export class AuthorizationService{


  public static header:HttpHeaders = new HttpHeaders();
  public static email:string = "";
  public static isLoggedIn:boolean = false;
  public static goodCookie:boolean = false;


  constructor(){

  }


  public setHeader(email:string,password:string){
    let authString = this.createAuthorizationString(email,password);
    this.setEmail(email);
    AuthorizationService.header = AuthorizationService.header.set('Authorization',authString)
  }

  public setEmail(email:string){
    AuthorizationService.email = email;
  }

  public createAuthorizationString(email:string,password:string){
    return 'Basic ' + btoa(email+':'+password);
  }

  public storeAuthorizationServiceToCookie(){
    this.storeInCookie('header',AuthorizationService.header.get('Authorization'));
    this.storeInCookie('email',AuthorizationService.email);
  }

  public retrieveAuthorizationServiceFromCookie(){
    if (this.retrieveFromCookie('email') != '') {
      AuthorizationService.goodCookie = true;
      AuthorizationService.header = AuthorizationService.header.set('Authorization', this.retrieveFromCookie('header'));
      AuthorizationService.email = this.retrieveFromCookie('email');
    }
  }

  public deleteAuthorization(){
    this.deleteCookie();
    AuthorizationService.header = new HttpHeaders();
    AuthorizationService.email = '';
    AuthorizationService.isLoggedIn = false;
  }

  private storeInCookie(key:string,any:any){
    AppComponent.cookieService.set(key,any);
  }

  private retrieveFromCookie(key:string):any{
    return AppComponent.cookieService.get(key);
  }

  private deleteCookie(){
    AppComponent.cookieService.deleteAll();
  }

}
