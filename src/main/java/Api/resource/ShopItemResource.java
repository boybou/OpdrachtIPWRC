package Api.resource;

import Api.View;
import Api.model.ShopItem;
import Api.service.ShopItemService;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import io.dropwizard.hibernate.UnitOfWork;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.ws.rs.*;
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

    @POST
    @UnitOfWork
    @RolesAllowed({"admin"})
    @Consumes(MediaType.APPLICATION_JSON)
    public void createShopItem(@Valid ShopItem shopItem){
        shopItemService.createShopItem(shopItem);
    }

    @DELETE
    @Path("/{itemName}")
    @UnitOfWork
    @RolesAllowed({"admin"})
    public long deleteShopItem(@PathParam("itemName")String itemName){
       return shopItemService.deleteShopItem(itemName);
    }

    @PUT
    @Path("/{itemName},{amount}")
    @UnitOfWork
    @RolesAllowed({"admin"})
    public long restockShopItem(@PathParam("itemName")String name,@PathParam("amount")double amount){
        return shopItemService.restockShopItem(name,amount);
    }

    @PUT
    @Path("/{itemName}-{amount}")
    @UnitOfWork
    @RolesAllowed({"admin","klant"})
    public long reduceStockShopItem(@PathParam("itemName")String itemName,@PathParam("amount")int amount){
        return shopItemService.reduceStockShopItem(itemName,amount);
    }

}
