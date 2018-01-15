package Api;

import com.google.inject.AbstractModule;
import com.google.inject.Inject;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.google.inject.matcher.Matchers;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.hibernate.UnitOfWorkAspect;
import io.dropwizard.hibernate.UnitOfWorkAwareProxyFactory;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

import java.lang.reflect.InvocationTargetException;

public class UnitOfWorkModule extends AbstractModule {

    @Override
    protected void configure() {
        UnitOfWorkInterceptor interceptor = new UnitOfWorkInterceptor();
        bindInterceptor(Matchers.any(), Matchers.annotatedWith(UnitOfWork.class), interceptor);
        requestInjection(interceptor);
    }

    @Provides
    @Singleton
    UnitOfWorkAwareProxyFactory provideUnitOfWorkAwareProxyFactory(HibernateBundle<ApiConfiguration> hibernateBundle) {
        return new UnitOfWorkAwareProxyFactory(hibernateBundle);
    }

    private static class UnitOfWorkInterceptor implements MethodInterceptor {

        @Inject
        UnitOfWorkAwareProxyFactory proxyFactory;

        @Override
        public Object invoke(MethodInvocation mi) throws Throwable {
            UnitOfWorkAspect aspect = proxyFactory.newAspect();
            try {
                aspect.beforeStart(mi.getMethod().getAnnotation(UnitOfWork.class));
                Object result = mi.proceed();
                aspect.afterEnd();
                return result;
            } catch (InvocationTargetException e) {
                aspect.onError();
                throw e.getCause();
            } catch (Exception e) {
                aspect.onError();
                throw e;
            } finally {
                aspect.onFinish();
            }
        }
    }
}
