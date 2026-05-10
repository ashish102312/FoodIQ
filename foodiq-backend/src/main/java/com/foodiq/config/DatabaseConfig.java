package com.foodiq.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/foodiq}")
    private String defaultUrl;

    @Value("${spring.datasource.username:postgres}")
    private String defaultUsername;

    @Value("${spring.datasource.password:admin123}")
    private String defaultPassword;

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        HikariConfig config = new HikariConfig();

        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            URI dbUri = new URI(databaseUrl);
            String username = dbUri.getUserInfo().split(":")[0];
            String password = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + 
                           (dbUri.getPort() == -1 ? 5432 : dbUri.getPort()) + dbUri.getPath();

            config.setJdbcUrl(dbUrl);
            config.setUsername(username);
            config.setPassword(password);
        } else if (databaseUrl != null && databaseUrl.startsWith("jdbc:postgresql://")) {
             config.setJdbcUrl(databaseUrl);
             config.setUsername(System.getenv("DATABASE_USERNAME") != null ? System.getenv("DATABASE_USERNAME") : defaultUsername);
             config.setPassword(System.getenv("DATABASE_PASSWORD") != null ? System.getenv("DATABASE_PASSWORD") : defaultPassword);
        } else {
            config.setJdbcUrl(defaultUrl);
            config.setUsername(defaultUsername);
            config.setPassword(defaultPassword);
        }
        
        config.setDriverClassName("org.postgresql.Driver");
        return new HikariDataSource(config);
    }
}
