package Api.model;

import Api.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

@Entity
@Table(name = "Shop_items")
@NamedQueries({
        @NamedQuery(name = "ShopItems.findAll", query = "SELECT e FROM ShopItem e")
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
    @NotEmpty
    @JsonView(View.Public.class)
    private float stockAmmount;

    public ShopItem() {
    }

    public ShopItem(String itemName, float stockAmmount) {
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

    public float getStockAmmount() {
        return stockAmmount;
    }

    public void setStockAmmount(float stockAmmount) {
        this.stockAmmount = stockAmmount;
    }
}
