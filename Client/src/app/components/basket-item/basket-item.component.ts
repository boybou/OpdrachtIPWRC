import {Component, Input, OnInit} from '@angular/core';
import {BasketItem} from "../../models/BasketItem";
import {CryptoApiService} from "../../shared/CryptoApiService";
import {BasketService} from "../../shared/BasketService";

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {
  @Input('basketItem') basketItem:BasketItem;

  private imageLink:string;
  private price:number = 0;

  constructor(private cryptoApi:CryptoApiService,private basketService:BasketService) { }

  ngOnInit() {
    this.imageLink = "https://files.coinmarketcap.com/static/img/coins/64x64/"+this.basketItem.itemName.toLocaleLowerCase()+".png";
    this.cryptoApi.get<any[]>(this.basketItem.itemName).subscribe(data =>
    {
      this.price = parseFloat(data[0]["price_eur"]);
    })
  }

  private removeFromBasket(){
    this.basketService.removeFromBasket(this.basketItem);
  }

}
