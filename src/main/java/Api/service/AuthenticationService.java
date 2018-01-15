package Api.service;

import Api.model.User;
import Api.persistence.DaoHolder;
import Api.persistence.UserDao;
import com.google.inject.Singleton;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.Authorizer;
import io.dropwizard.auth.basic.BasicCredentials;
import io.dropwizard.hibernate.UnitOfWork;

import javax.inject.Inject;
import java.util.Optional;


public class AuthenticationService implements Authenticator<BasicCredentials, User>, Authorizer<User> {

    private final UserDao userDao;


    @Inject
    public AuthenticationService(){
        this.userDao = DaoHolder.userDao;
    }



    @Override
    @UnitOfWork
    public Optional<User> authenticate(BasicCredentials credentials) throws AuthenticationException
    {



        User user = userDao.getUserByEmail(credentials.getUsername());
        if (user != null && user.getPassword().equals(credentials.getPassword()))
        {
            return Optional.of(user);
        }

        return Optional.empty();

    }

    @UnitOfWork
    @Override
    public boolean authorize(User user, String roleName)
    {
        return user.hasRole(roleName);
    }

}
