import {Component, Input, OnInit} from '@angular/core';
import {CryptoApiService} from "../../shared/CryptoApiService";
import {ShopItem} from "../../models/ShopItem";
import {BasketService} from "../../shared/BasketService";
import {BasketItem} from "../../models/BasketItem";
import {ResponseUtil} from "../../shared/ResponseUtil";


@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  @Input('shopItem') shopItem:ShopItem;

  private response:string;
  private amount:number;
  private imageLink:string;
  private price:number = 0;
  constructor(private cryptoApi:CryptoApiService,private basketService:BasketService,private responseUtil:ResponseUtil) { }

  ngOnInit() {
    this.imageLink = "https://files.coinmarketcap.com/static/img/coins/128x128/"+this.shopItem.itemName.toLocaleLowerCase()+".png";
    this.cryptoApi.get<any[]>(this.shopItem.itemName).subscribe(data =>
    {
      this.price = parseFloat(data[0]["price_eur"]);
    })
  }

  private voegToeAanWinkelWagen(){
    if(this.genoegOpVooraad() && this.amount > 0) {
      let basketItem:BasketItem = new BasketItem(this.shopItem.itemName, this.amount)
      if(!this.basketTeVol(basketItem)) {
        this.basketService.addToBasket(basketItem);
        this.response = this.responseUtil.goodResponse("aan winkelwagen toegevoegd");
        setTimeout(e => {
          this.response = this.responseUtil.goodResponse("");
        }, 2000);
      }
      else {
        this.response = this.responseUtil.badResponse("er al zitten teveel van dit product in u winkelwagen");
        setTimeout(e => {
          this.response = this.responseUtil.goodResponse("");
        }, 2000);
      }
    }
    else {
      this.response = this.responseUtil.badResponse("niet genoeg op vooraad")
      setTimeout(e=>{
        this.response = this.responseUtil.goodResponse("");
      },2000);
    }
  }

  private genoegOpVooraad(){
    return this.amount <= this.shopItem.stockAmmount;
  }

  private basketTeVol(basketItem){
    if(this.basketService.getFromBasket(basketItem) != null){
      if(this.basketService.getFromBasket(basketItem).amount + this.amount <= this.shopItem.stockAmmount){
        return false;
      }
      else {
        return true;
      }
    }else {
      return false;
    }
  }
}
