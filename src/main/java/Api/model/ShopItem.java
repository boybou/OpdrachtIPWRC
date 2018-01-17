package Api.model;

import Api.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

@Entity
@Table(name = "Shop_items")
@NamedQueries({
        @NamedQuery(name = "ShopItems.findAll", query = "SELECT e FROM ShopItem e"),
        @NamedQuery(name = "ShopItems.deleteByName", query =  "DELETE FROM ShopItem e WHERE e.itemName = :itemName"),
        @NamedQuery(name = "ShopItems.restockByName", query = "UPDATE ShopItem e SET e.stockAmmount = e.stockAmmount + :stockAmmount WHERE e.itemName = :itemName"),
        @NamedQuery(name = "ShopItems.reduceStock", query = "UPDATE ShopItem e SET e.stockAmmount = e.stockAmmount - :stockAmmount WHERE e.itemName = :itemName")
})
public class ShopItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Public.class)
    private int id;

    @Column(name = "item_name")
    @NotEmpty
    @JsonView(View.Public.class)
    private String itemName;

    @Column(name = "stock_ammount")
    @JsonView(View.Public.class)
    private double stockAmmount;

    public ShopItem() {
    }

    public ShopItem(String itemName, double stockAmmount) {
        this.itemName = itemName;
        this.stockAmmount = stockAmmount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getStockAmmount() {
        return stockAmmount;
    }

    public void setStockAmmount(double stockAmmount) {
        this.stockAmmount = stockAmmount;
    }
}
