import { Component, OnInit } from '@angular/core';
import {ShopItem} from "../../models/ShopItem";
import {ApiService} from "../../shared/ApiService";
import {StaticUris} from "../../shared/StaticUris";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public static response:string = "asdadasdadasd";
  private shopItemList:ShopItem[] = [];
  private ready:boolean = false;

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.get<ShopItem[]>(StaticUris.getAllShopItems).subscribe(data =>{
      this.handleData(data);
    },error =>{
      console.log("internal server error");
    })
  }

  private handleData(data){
    this.shopItemList = data;
    this.ready = true;
  }


}
