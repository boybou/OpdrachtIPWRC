export class StaticUris{
  public static getSelf:string = '/api/users/me';
  public static createUser:string = '/api/users';
  public static getAllShopItems:string = '/api/shopItems';
  public static createShopItem:string = '/api/shopItems';
  public static deleteShopItem(itemName:string):string{
    return '/api/shopItems/'+itemName;
  }
  public static restockShopItems(itemName:string,amount:number){
    return '/api/shopItems/'+itemName+','+amount;
  }
  public static editUser:string = '/api/users';
  public static promoteUserToAdmin(email:string){
    return '/api/users/'+email;
  }
  public static reduceStockShopItems(itemName:string,amount:number){
    return '/api/shopItems/'+itemName+'-'+amount;
  }

  public static deletUser(email:string){
    return '/api/users/'+email;
  }
}
