import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {CryptoApiService} from "../../shared/CryptoApiService";
import {ApiService} from "../../shared/ApiService";
import {StaticUris} from "../../shared/StaticUris";
import {ShopItem} from "../../models/ShopItem";
import {AddShopItem} from "../../models/AddShopItem";
import {Router} from "@angular/router";
import {ResponseUtil} from "../../shared/ResponseUtil";
import {AuthorizationService} from "../../shared/AuthorizationService";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


  private deleteCoinName:string;
  private userDeleteEmail;
  private response:string;
  private coinName:string;
  private restockCoinName:string;
  private restockAmmount:number;
  private userEmail:string;


  private deleteCoin:boolean = false;
  private deleteUser:boolean = false;
  private choosing:boolean = true;
  private addCoin:boolean = false;
  private restockCoin:boolean = false;
  private promoteToAdmin:boolean = false;

  constructor(private crypoApi:CryptoApiService,private apiService:ApiService,private router:Router,private responseUtil:ResponseUtil) { }

  ngOnInit() {
  }


  private adddCoin(){
    this.crypoApi.get(this.coinName).subscribe(data =>{
      this.apiService.post(StaticUris.createShopItem,new AddShopItem(this.coinName,1)).subscribe(data =>{
        this.response =this.responseUtil.goodResponse("coin toegevoegd");
        this.backToChoosing();
      })
    },error =>{
    this.response = this.responseUtil.badResponse("geen geldige coin naam");
    })

  }

  private restockkCoin(){
    this.apiService.put<number>(StaticUris.restockShopItems(this.restockCoinName,this.restockAmmount)).subscribe(data=>{
      if(data == 1){
        this.response = this.responseUtil.goodResponse("coin restocked")
        this.backToChoosing();
      }
      else if(data == 0){
        this.response = this.responseUtil.badResponse("coin not found")
      }
    },error => {
      this.response = this.responseUtil.badResponse("server error")
    })

  }

  private promoteeToAdmin(){
    this.apiService.put<number>(StaticUris.promoteUserToAdmin(this.userEmail)).subscribe(data=>{
      if(data == 1){
        this.response = this.responseUtil.goodResponse("user promoted")
        this.backToChoosing();
      }
      else if(data == 0){
        this.response = this.responseUtil.badResponse("user not found")
      }
    },error => {
      this.response = this.responseUtil.badResponse("server error")
    })
  }

  private deleteeUser(){
    if(AuthorizationService.activeUser.email != this.userDeleteEmail){
    this.apiService.delete<number>(StaticUris.deletUser(this.userDeleteEmail)).subscribe(data=>{
      if(data == 1){
        this.response = this.responseUtil.goodResponse("user deleted");
        this.backToChoosing();
      }
      else if(data == 0){
        this.response = this.responseUtil.badResponse("user not found");
      }
    },error => {
      this.response = this.responseUtil.badResponse("server error");
    })
    }else {
      this.response = this.responseUtil.badResponse("cant delete self");
    }
  }

  private deleteeCoin(){
    this.apiService.delete<number>(StaticUris.deleteShopItem(this.deleteCoinName)).subscribe(data=>{
      if(data == 1){
        this.response = this.responseUtil.goodResponse("coin deleted");
        this.backToChoosing();
      }
      else if(data == 0){
        this.response = this.responseUtil.badResponse("coin not found")
      }
    },error => {
      this.response = this.responseUtil.badResponse("server error")
    })
  }

  private chooseAddCoin(){
      this.addCoin = true;
      this.choosing = false;
  }
  private chooseRestockCoin(){
    this.restockCoin = true;
    this.choosing = false;

  }
  private choosePromoteToAdmin(){
    this.promoteToAdmin = true;
    this.choosing = false;
  }

  private chooseDeleteUser(){
    this.deleteUser = true;
    this.choosing = false;

  }
  private chooseDeleteCoin(){
    this.deleteCoin = true;
    this.choosing = false;
  }

  private closeAdminPannel(){
    AppComponent.sesamOpen = false;
  }

  private backToChoosing(){
    this.choosing = true;
    this.addCoin = false;
    this.restockCoin = false;
    this.promoteToAdmin = false;
    this.deleteCoin = false;
    this.deleteUser = false;
    this.router.navigate(['/'])
  }




}
