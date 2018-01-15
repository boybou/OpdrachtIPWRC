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


    public List<ShopItem> findAll() {
        return list(namedQuery("ShopItems.findAll"));
    }
}

