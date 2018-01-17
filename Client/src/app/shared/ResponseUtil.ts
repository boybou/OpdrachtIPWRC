import {Injectable} from "@angular/core";

@Injectable()
export class ResponseUtil{

  constructor(){

  }
  public goodResponse(text){
    document.getElementById("response").style.color = "green";
    return text;
  }
  public badResponse(text){

    document.getElementById("response").style.color = "red";
    return  text;
  }

}
