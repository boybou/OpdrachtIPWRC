package Api;

import Api.model.ShopItem;
import Api.model.User;
import Api.persistence.DaoHolder;
import Api.persistence.ShopItemDao;
import Api.persistence.UserDao;
import Api.service.AuthenticationService;
import com.google.inject.Module;
import com.hubspot.dropwizard.guice.GuiceBundle;
import io.dropwizard.Application;
import io.dropwizard.ConfiguredBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.bundles.assets.ConfiguredAssetsBundle;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.hibernate.UnitOfWorkAwareProxyFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlet.FilterHolder;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.DispatcherType;
import java.security.Principal;
import java.util.EnumSet;
/**
 * Created by boybo on 17-12-2017.
 */
public class ApiApplication extends Application<ApiConfiguration> {
    private final Logger logger = LoggerFactory.getLogger(ApiApplication.class);

    private ConfiguredBundle assetsBundle;
    private GuiceBundle guiceBundle;

    private final HibernateBundle<ApiConfiguration> hibernate = new HibernateBundle<ApiConfiguration>(User.class,ShopItem.class) {
        @Override
        public DataSourceFactory getDataSourceFactory(ApiConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };



    private String name;

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public void initialize(Bootstrap<ApiConfiguration> bootstrap)
    {
        assetsBundle = (ConfiguredBundle) new ConfiguredAssetsBundle("/assets/", "/client", "index.html");
        guiceBundle = createGuiceBundle(ApiConfiguration.class, new ApiGuiceModule());


        bootstrap.addBundle(hibernate);
        bootstrap.addBundle(assetsBundle);
        bootstrap.addBundle(guiceBundle);


    }




    @Override
    public void run(ApiConfiguration configuration, Environment environment)
    {
        name = configuration.getApiName();

        logger.info(String.format("Set Api name to %s", name));
        UserDao userDao = new UserDao(hibernate.getSessionFactory());
        ShopItemDao shopItemDao = new ShopItemDao(hibernate.getSessionFactory());
        DaoHolder.userDao = userDao;
        DaoHolder.shopItemDao = shopItemDao;
        environment.jersey().register(DaoHolder.userDao);
        environment.jersey().register(DaoHolder.shopItemDao);

        setupAuthentication(environment);
        configureClientFilter(environment);
    }

    private GuiceBundle createGuiceBundle(Class<ApiConfiguration> configurationClass, Module module)
    {
        GuiceBundle.Builder guiceBuilder = GuiceBundle.<ApiConfiguration>newBuilder()
                .addModule(module)
                .enableAutoConfig(new String[] { "Api" })
                .setConfigClass(configurationClass);

        return guiceBuilder.build();
    }

    private void setupAuthentication(Environment environment)
    {
        UnitOfWorkModule unitOfWorkModule = new UnitOfWorkModule();
        unitOfWorkModule.provideUnitOfWorkAwareProxyFactory(hibernate);
        AuthenticationService authenticationService = unitOfWorkModule.provideUnitOfWorkAwareProxyFactory(hibernate).create(AuthenticationService.class);
        ApiUnauthorizedHandler unauthorizedHandler = guiceBundle.getInjector().getInstance(ApiUnauthorizedHandler.class);



        environment.jersey().register(new AuthDynamicFeature(
                new BasicCredentialAuthFilter.Builder<User>()
                        .setAuthenticator(authenticationService)
                        .setAuthorizer(authenticationService)
                        .setRealm("SUPER SECRET STUFF")
                        .setUnauthorizedHandler(unauthorizedHandler)
                        .buildAuthFilter())
        );

        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));
    }

    private void configureClientFilter(Environment environment)
    {
        environment.getApplicationContext().addFilter(
                new FilterHolder(new ClientFilter()),
                "/*",
                EnumSet.allOf(DispatcherType.class)
        );
    }

    public static void main(String[] args) throws Exception
    {

        new ApiApplication().run(args);
    }
}

