import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/ApiService";
import {Router} from "@angular/router";
import {StaticUris} from "../../shared/StaticUris";
import {User} from "../../models/User";
import {SignupUser} from "../../models/SignupUser";
import {ResponseUtil} from "../../shared/ResponseUtil";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private firstName:string;
  private lastName:string;
  private password:string;
  private passwordHerhaal:string;
  private email:string;
  private response:string;
  constructor(private apiService:ApiService,private router:Router,private responseUtil:ResponseUtil) {

  }

  ngOnInit() {
  }

  private signup(){
    if(this.doPasswordsMatch() &&this.password != "") {
      this.apiService.post(StaticUris.createUser, new SignupUser(this.firstName, this.lastName, this.email, this.password,"klant")).subscribe(data => {
        this.signedup()
      }, error =>{
      this.response = this.responseUtil.badResponse("niet gelukt \n" +
          "- passsword moet minimaal 8 tekens bevatten \n" +
        "- misschien is het email al in gebruik");
      })
    }
    else {
      this.response = this.responseUtil.badResponse("password's komen niet overeen");
    }
  }
  private signedup(){
    this.router.navigate(['/'])
  }

  private doPasswordsMatch(){
    if(this.password == this.passwordHerhaal){
      return true
    }
    return false;
  }

}
