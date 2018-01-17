import { Component, OnInit } from '@angular/core';
import {BasketItem} from "../../models/BasketItem";
import {BasketService} from "../../shared/BasketService";

@Component({
  selector: 'app-hover-basket',
  templateUrl: './hover-basket.component.html',
  styleUrls: ['./hover-basket.component.css']
})
export class HoverBasketComponent implements OnInit {

  private ready:boolean = false;
  private basketItemList:BasketItem[] = [];
  constructor(private basketService:BasketService) { }

  ngOnInit() {
    this.basketService.retrieveBasketServiceFromCookie();
    this.basketItemList = BasketService.basketItems;
    this.ready = true;

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
