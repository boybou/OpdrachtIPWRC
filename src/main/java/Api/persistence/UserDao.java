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

    public long editUser(User user){
        return namedQuery("Users.editUser").setParameter("firstName",user.getFirstName())
                .setParameter("lastName",user.getLastName())
                .setParameter("email",user.getEmail())
                .setParameter("password",user.getPassword())
                .setParameter("id",user.getId())
                .executeUpdate();
    }

    public long promoteUserToAdmin(String email){
        return namedQuery("Users.promoteUserToAdmin").setParameter("email",email)
                .setParameter("role","admin").executeUpdate();
    }

    public long deleteUser(String email){
        return namedQuery("Users.deleteUser").setParameter("email",email).executeUpdate();
    }
}
