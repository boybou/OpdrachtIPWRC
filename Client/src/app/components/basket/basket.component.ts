import { Component, OnInit } from '@angular/core';
import {BasketItem} from "../../models/BasketItem";
import {BasketService} from "../../shared/BasketService";
import {ApiService} from "../../shared/ApiService";
import {StaticUris} from "../../shared/StaticUris";
import {ResponseUtil} from "../../shared/ResponseUtil";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  private response:string;
  private ready:boolean = false;
  private basketItemList:BasketItem[] = [];
  constructor(private basketService:BasketService,private apiService:ApiService,private responseUtil:ResponseUtil) { }

  ngOnInit() {
    this.basketService.retrieveBasketServiceFromCookie();
    this.basketItemList = BasketService.basketItems;
    this.ready = true;

  }

  private buy(){
    for(let i = 0;i<this.basketItemList.length;i++){
      this.apiService.put(StaticUris.reduceStockShopItems(this.basketItemList[i].itemName,this.basketItemList[i].amount)).toPromise().then(data =>{
        this.response = this.responseUtil.goodResponse("aankoop voltooid!");
        this.basketService.removeFromBasket(this.basketItemList[i]);
      },error => {
        this.response = this.responseUtil.badResponse("aankoop niet gelukt")
      })
    }
    this.basketItemList = [];
    BasketService.basketItems = [];
    this.basketService.deleteCookie();
  }

  private emptyBasket(){

    if(this.basketItemList.length == 0){
      return true;
    }
    else {
      return false;
    }
  }

}
