import {BasketItem} from "../models/BasketItem";
import {AppComponent} from "../app.component";

export class BasketService{

  public static basketItems:BasketItem[] = [];

  constructor(){

  }

  public addToBasket(basketItem:BasketItem) {
    let added = false;
    for (let i = 0; i < BasketService.basketItems.length; i++) {
      if (BasketService.basketItems[i].itemName == basketItem.itemName) {
        BasketService.basketItems[i] = new BasketItem(basketItem.itemName, (basketItem.amount + BasketService.basketItems[i].amount));
        added = true;
      }
    }
    if(!added) {
      BasketService.basketItems.push(basketItem);
    }
    this.storeBasketServiceToCookie();
  }

  public removeFromBasket(basketItem:BasketItem){
    for(let i = 0;i<BasketService.basketItems.length;i++){
      if(BasketService.basketItems[i].itemName == basketItem.itemName){
        BasketService.basketItems.splice(i,1);
      }
    }
    this.storeBasketServiceToCookie();

  }

  public getFromBasket(basketItem:BasketItem):BasketItem{
    for(let i = 0;i<BasketService.basketItems.length;i++){
      if(BasketService.basketItems[i].itemName == basketItem.itemName){
        return BasketService.basketItems[i];
      }
    }

  }

  public storeBasketServiceToCookie(){
    this.storeInCookie('basket',JSON.stringify(BasketService.basketItems));
  }

  public retrieveBasketServiceFromCookie(){
    if(this.retrieveFromCookie('basket') != '') {
      BasketService.basketItems = JSON.parse(this.retrieveFromCookie('basket'));
    }
  }

  private storeInCookie(key:string,any:any){
    AppComponent.cookieService.set(key,any);
  }

  private retrieveFromCookie(key:string):any{
    return AppComponent.cookieService.get(key);
  }

  public deleteCookie(){
    AppComponent.cookieService.delete('basket');
  }



}
