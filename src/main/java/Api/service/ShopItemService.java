package Api.service;

import Api.model.ShopItem;
import Api.persistence.DaoHolder;
import Api.persistence.ShopItemDao;
import Api.persistence.UserDao;

import javax.inject.Inject;
import java.util.List;

public class ShopItemService extends BaseService<ShopItem> {

    private final ShopItemDao shopItemDao;

    @Inject
    public ShopItemService()
    {
        this.shopItemDao = DaoHolder.shopItemDao;
    }

    public List<ShopItem> getAllShopItems(){
        return shopItemDao.findAll();
    }

    public void createShopItem(ShopItem shopItem){
        shopItemDao.create(shopItem);
    }

    public long deleteShopItem(String itemName){
       return shopItemDao.deleteShopItem(itemName);
    }

    public long restockShopItem(String itemName,double amount){
        return shopItemDao.restockShopItem(itemName,amount);
    }

    public long reduceStockShopItem(String itemName,double amount){
        return shopItemDao.reduceStockShopItem(itemName,amount);
    }
}
