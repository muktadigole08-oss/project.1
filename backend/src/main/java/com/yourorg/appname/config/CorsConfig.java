package com.yourorg.appname.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${CORS_ALLOWED_ORIGINS:}")
    private String corsAllowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        List<String> allowedOriginPatterns = new ArrayList<>(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000",
                "https://*.onrender.com"
        ));

        // Read optional custom origins from CORS_ALLOWED_ORIGINS environment variable
        String envOrigins = System.getenv("CORS_ALLOWED_ORIGINS");
        String effectiveOrigins = (envOrigins != null && !envOrigins.isBlank())
                ? envOrigins
                : (corsAllowedOrigins != null ? corsAllowedOrigins : "");

        if (!effectiveOrigins.isBlank()) {
            String[] customOrigins = effectiveOrigins.split(",");
            for (String origin : customOrigins) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty() && !allowedOriginPatterns.contains(trimmed)) {
                    allowedOriginPatterns.add(trimmed);
                }
            }
        }

        configuration.setAllowedOriginPatterns(allowedOriginPatterns);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With", "Origin"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
