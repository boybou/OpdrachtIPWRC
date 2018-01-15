package Api.resource;

import Api.model.ShopItem;
import Api.service.ShopItemService;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Singleton
@Path("/shopItems")
@Produces(MediaType.APPLICATION_JSON)
public class ShopItemResource {

    private ShopItemService shopItemService;

    @Inject
    public ShopItemResource(ShopItemService shopItemService){
        this.shopItemService = shopItemService;
    }

    @GET
    @UnitOfWork
    public List<ShopItem> getAllShopItems(){
       return shopItemService.getAllShopItems();
    }
}
