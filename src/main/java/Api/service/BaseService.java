package Api.service;

import Api.model.User;

import javax.ws.rs.ForbiddenException;
import javax.ws.rs.NotFoundException;


public class BaseService<T>
{
    public T requireResult(T model)
    {
        if (model == null)
        {
            throw new NotFoundException();
        }

        return model;
    }

    public void assertSelf(User user, User user2)
    {
        if (!user.equals(user2))
        {
            throw new ForbiddenException();
        }
    }
}
