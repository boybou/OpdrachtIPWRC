import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {AuthorizationService} from "../../shared/AuthorizationService";
import {ApiService} from "../../shared/ApiService";
import {StaticUris} from "../../shared/StaticUris";
import {ResponseUtil} from "../../shared/ResponseUtil";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private response:string;
  private editing:boolean;
  private passwordHerhaal:string;
  private user:User;
  constructor(private apiService:ApiService,private responseUtil:ResponseUtil) { }

  ngOnInit() {
    this.user = AuthorizationService.activeUser;
  }

  private aanpassen(){
    this.editing = true;
  }

  private verander(){
    if(this.doPasswordsMatch() &&this.user.password != "") {
      this.apiService.put(StaticUris.editUser,this.user).subscribe(data => {
        this.response = this.responseUtil.goodResponse("aangepast!");
        this.editing = false;
      }, error =>{
        this.response = this.responseUtil.badResponse("niet gelukt \n" +
          "- passsword moet minimaal 8 tekens bevatten \n" +
          "- mischien is het email al in gebruik");
      })
    }
    else {
      this.response = this.responseUtil.badResponse("password's komen niet overeen");
    }
  }


  private doPasswordsMatch(){
    if(this.user.password == this.passwordHerhaal){
      return true
    }
    return false;
  }
}
