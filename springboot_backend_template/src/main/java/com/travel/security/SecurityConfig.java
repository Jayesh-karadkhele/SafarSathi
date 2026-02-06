package com.travel.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // 🔓 DISABLE CSRF Completely
                .cors(org.springframework.security.config.Customizer.withDefaults()) // 🔓 ENABLE CORS
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 🔓 ALLOW ALL PATHS
                );

        return http.build();
    }
}
