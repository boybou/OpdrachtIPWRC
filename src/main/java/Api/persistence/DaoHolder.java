package Api.persistence;

public class DaoHolder {
    public static UserDao userDao;
    public static ShopItemDao shopItemDao;

    public DaoHolder(UserDao userDao,ShopItemDao shopItemDao){
        this.userDao = userDao;
        this.shopItemDao = shopItemDao;
    }
}
