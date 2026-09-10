package com.yourorg.appname.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

/**
 * Smart Database URL Adapter for Render Cloud PostgreSQL.
 *
 * Automatically detects Render's injected DATABASE_URL environment variable
 * (which typically uses the 'postgres://' or 'postgresql://' URI scheme)
 * and transforms it into a standard JDBC connection URL ('jdbc:postgresql://...'),
 * extracting credentials and configuring a production Hikari connection pool.
 */
@Configuration
@Profile("postgres")
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${DATABASE_URL:}")
    private String databaseUrlProperty;

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        String envDatabaseUrl = System.getenv("DATABASE_URL");
        String effectiveUrl = (envDatabaseUrl != null && !envDatabaseUrl.isBlank())
                ? envDatabaseUrl.trim()
                : (databaseUrlProperty != null ? databaseUrlProperty.trim() : "");

        if (!effectiveUrl.isBlank()) {
            log.info("DATABASE_URL detected. Configuring PostgreSQL DataSource from environment...");
            try {
                return createDataSourceFromUrl(effectiveUrl);
            } catch (Exception e) {
                log.error("Failed to parse DATABASE_URL: {}. Falling back to default datasource properties.", effectiveUrl, e);
            }
        }

        log.info("DATABASE_URL not set. Falling back to application-postgres properties...");
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }

    private HikariDataSource createDataSourceFromUrl(String rawUrl) throws Exception {
        // If it is already a JDBC URL, apply it directly
        if (rawUrl.startsWith("jdbc:postgresql://")) {
            HikariConfig config = new HikariConfig();
            config.setDriverClassName("org.postgresql.Driver");
            config.setJdbcUrl(rawUrl);
            return new HikariDataSource(config);
        }

        // Clean any leading 'jdbc:' prefix before URI parsing
        String parseableUrl = rawUrl;
        if (parseableUrl.startsWith("jdbc:")) {
            parseableUrl = parseableUrl.substring(5);
        }

        URI uri = new URI(parseableUrl);

        // Extract credentials
        String username = null;
        String password = null;
        String userInfo = uri.getUserInfo();
        if (userInfo != null && !userInfo.isEmpty()) {
            String[] userParts = userInfo.split(":", 2);
            username = URLDecoder.decode(userParts[0], StandardCharsets.UTF_8);
            if (userParts.length > 1) {
                password = URLDecoder.decode(userParts[1], StandardCharsets.UTF_8);
            }
        }

        String host = uri.getHost();
        int port = uri.getPort() > 0 ? uri.getPort() : 5432;
        String path = uri.getPath(); // includes leading '/'
        String query = uri.getQuery();

        StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                .append(host)
                .append(":")
                .append(port)
                .append(path);

        if (query != null && !query.isBlank()) {
            jdbcUrl.append("?").append(query);
        }

        log.info("Successfully converted DATABASE_URL to JDBC format: jdbc:postgresql://{}:{}{}", host, port, path);

        HikariConfig config = new HikariConfig();
        config.setDriverClassName("org.postgresql.Driver");
        config.setJdbcUrl(jdbcUrl.toString());
        if (username != null) {
            config.setUsername(username);
        }
        if (password != null) {
            config.setPassword(password);
        }

        // Production-ready connection pool defaults
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        config.setPoolName("MedicarePostgresHikariPool");

        return new HikariDataSource(config);
    }
}
