import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthorizationService} from "./AuthorizationService";

@Injectable()
export class ApiService{
  constructor(private httpClient:HttpClient){

  }

  public get<Any>(uri: string) {
    let header = AuthorizationService.header;
    return this.httpClient.get<Any>(uri, {headers: header});


  }

  public post<Any>(uri: string,data: Object) {
    let header = AuthorizationService.header;
    return this.httpClient.post(uri,data, {headers: header});
  }

}
