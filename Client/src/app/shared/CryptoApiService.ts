
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CryptoApiService{


  constructor(private httpClient:HttpClient){

  }

  public get<Any>(uri: string) {

    return this.httpClient.get<Any>("https://api.coinmarketcap.com/v1/ticker/"+uri+"/?convert=EUR");

  }

}
