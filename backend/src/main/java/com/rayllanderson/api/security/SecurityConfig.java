package com.rayllanderson.api.security;

import com.rayllanderson.api.security.jwt.JwtAuthenticationFilter;
import com.rayllanderson.api.security.jwt.JwtAuthorizationFilter;
import com.rayllanderson.api.security.jwt.handler.AccessDeniedHandler;
import com.rayllanderson.api.security.jwt.handler.UnauthorizedHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("userDetailsService")
    private UserDetailsService userDetailsService;

    @Autowired
    private UnauthorizedHandler unauthorizedHandler;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Autowired
    private Environment env;

    @Override
    protected void configure(HttpSecurity http) throws Exception {


        final String GET_USERS = "/api/v1.0/users";
        final String GET_USER_BY_ID = "/api/v1.0/users/{id}";


        if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http.headers().frameOptions().disable();
        }

        AuthenticationManager authManager = authenticationManager();
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/v1.0/login").permitAll()
                .antMatchers("/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**, /users/**")
                .permitAll()
                .antMatchers(HttpMethod.GET, GET_USER_BY_ID, GET_USERS)
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/v1.0/users/")
                .permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable()
                .addFilter(new JwtAuthenticationFilter(authManager))
                .addFilter(new JwtAuthorizationFilter(authManager, userDetailsService))
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        //pra usar o h2. deve ser comentado em produção
//        http.authorizeRequests().antMatchers("/h2-console/**").permitAll();
//        http.headers().frameOptions().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final String CLIENT_URL = "http://localhost:8080/";
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(CLIENT_URL));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
