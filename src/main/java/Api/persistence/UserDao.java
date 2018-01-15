package Api.persistence;

import Api.model.User;
import io.dropwizard.hibernate.AbstractDAO;
import io.dropwizard.hibernate.UnitOfWork;
import org.hibernate.SessionFactory;


import java.util.List;

public class UserDao extends AbstractDAO<User>  {


    public UserDao(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public User findById(int id) {
        return get(id);
    }

    public long create(User user) {
        return persist(user).getId();
    }

    public User getUserByEmail(String email){
        return (User) namedQuery("Users.findByEmail").setParameter("email",email).getSingleResult();
    }

    public List<User> findAll() {
        return list(namedQuery("Users.findAll"));
    }
}
