import {Component, Input, OnInit} from '@angular/core';
import {CryptoApiService} from "../../shared/CryptoApiService";
import {BasketItem} from "../../models/BasketItem";
import {BasketService} from "../../shared/BasketService";

@Component({
  selector: 'app-hover-basket-item',
  templateUrl: './hover-basket-item.component.html',
  styleUrls: ['./hover-basket-item.component.css']
})
export class HoverBasketItemComponent implements OnInit {
  @Input('basketItem') basketItem:BasketItem;

  private imageLink:string;
  private price:number = 0;

  constructor(private cryptoApi:CryptoApiService,private basketService:BasketService) { }

  ngOnInit() {
    this.imageLink = "https://files.coinmarketcap.com/static/img/coins/32x32/"+this.basketItem.itemName.toLocaleLowerCase()+".png";
    this.cryptoApi.get<any[]>(this.basketItem.itemName).subscribe(data =>
    {
      this.price = parseFloat(data[0]["price_eur"]);
    })
  }

  private removeFromBasket(){
    this.basketService.removeFromBasket(this.basketItem);
  }

}
