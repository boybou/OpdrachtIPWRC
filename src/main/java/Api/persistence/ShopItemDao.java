package Api.persistence;

import Api.model.ShopItem;
import Api.model.User;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;

public class ShopItemDao extends AbstractDAO<ShopItem> {


    public ShopItemDao(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public ShopItem findById(int id) {
        return get(id);
    }

    public long create(ShopItem shopItem) {

        return persist(shopItem).getId();
    }

    public long deleteShopItem(String itemName){
       return namedQuery("ShopItems.deleteByName").setParameter("itemName",itemName).executeUpdate();
    }

    public long restockShopItem(String itemName,double amount){
        return namedQuery("ShopItems.restockByName").setParameter("itemName",itemName).setParameter("stockAmmount",amount).executeUpdate();
    }

    public long reduceStockShopItem(String itemName,double amount){
        return namedQuery("ShopItems.reduceStock").setParameter("itemName",itemName).setParameter("stockAmmount",amount).executeUpdate();
    }


    public List<ShopItem> findAll() {
        return list(namedQuery("ShopItems.findAll"));
    }
}

