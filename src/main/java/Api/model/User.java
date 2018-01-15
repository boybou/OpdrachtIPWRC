package Api.model;

import Api.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.query.Query;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.security.Principal;

@Entity
@Table(name = "Users")
@NamedQueries({
        @NamedQuery(name = "Users.findAll", query = "SELECT e FROM User e"),
        @NamedQuery(name = "Users.findByEmail", query = "SELECT e FROM User e WHERE e.email = :email")
})
public class User implements Principal {

    @Column(name = "first_name")
    @NotEmpty
    @JsonView(View.Public.class)
    private String firstName;

    @Column(name = "last_name")
    @NotEmpty
    @JsonView(View.Public.class)
    private String lastName;

    @Column(name = "email")
    @NotEmpty
    @Email
    @JsonView(View.Public.class)
    private String email;

    @Column(name = "password")
    @NotEmpty
    @Length(min = 8)
    @JsonView(View.Protected.class)
    private String password;

    @Column(name = "role")
    @JsonView(View.Private.class)
    private String role;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Public.class)
    private int id;

    public User(){

    }
    public User(String firstName, String lastName, String email, String password, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean hasRole(String roleName){
        return this.role.equals(roleName);
    }

    @Override
    public String getName() {
        return "UserPrincipal";
    }
}
