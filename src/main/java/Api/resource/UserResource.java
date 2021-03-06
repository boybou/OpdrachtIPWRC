package Api.resource;

import Api.View;
import Api.model.User;
import Api.service.UserService;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import io.dropwizard.auth.Auth;
import io.dropwizard.hibernate.UnitOfWork;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Singleton
@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    private UserService userService;

    @Inject
    public UserResource(UserService userService){
        this.userService = userService;
    }

    @GET
    @Path("/me")
    @JsonView(View.Private.class)
    @RolesAllowed({"admin","klant"})
    @UnitOfWork
    public User authenticate(@Auth User authenticator)
    {
        return authenticator;
    }

    @GET
    @Path("/{id}")
    @JsonView(View.Public.class)
    @RolesAllowed({"admin","klant"})
    @UnitOfWork
    public User retrieveEmployeeSpecificHours(@PathParam("id") int id){
        return userService.getUser(id);
    }

    @POST
    @JsonView(View.Public.class)
    @UnitOfWork
    @Consumes(MediaType.APPLICATION_JSON)
    public void createUser(@Valid User user){
        user.setRole("klant");
        userService.createUser(user);
    }

    @PUT
    @JsonView(View.Public.class)
    @UnitOfWork
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"admin","klant"})
    public long editUser(@Valid User user){
        return userService.editUser(user);
    }

    @PUT
    @Path("/{email}")
    @JsonView(View.Public.class)
    @UnitOfWork
    @RolesAllowed({"admin"})
    public long promoteUserToAdmin(@PathParam("email")String email){
        return userService.promoteUserToAdmin(email);
    }

    @DELETE
    @Path("/{email}")
    @UnitOfWork
    @RolesAllowed({"admin"})
    public long deleteUser(@PathParam("email")String email){
        return userService.deleteUser(email);
    }

}
