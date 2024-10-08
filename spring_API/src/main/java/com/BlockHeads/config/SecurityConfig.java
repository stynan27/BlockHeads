package com.BlockHeads.config;

//import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
	
	@Bean
	public static PasswordEncoder passwordEncoder(){
		// number of times to hash the password
		// makes the algorithm slower, but more secure
		int hashingRounds = 15;
		
        return new BCryptPasswordEncoder(hashingRounds);
    }
	
    @Bean
    public CustomAuthenticationProvider authProvider() {
        return new CustomAuthenticationProvider();
    }
	
    @Bean
    public AuthenticationManager authenticationManager(
                                 AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    	// TODO: Disable csrf -> ENABLE FOR PRODUCTION!!!
        http.csrf().disable()
	        .authorizeHttpRequests((authorize) ->
	                //authorize.anyRequest().authenticated()
	        		authorize
	        			.requestMatchers(HttpMethod.GET, "/api/**").permitAll()
	    					.requestMatchers("/api/user/**").permitAll()
	                            .anyRequest().authenticated()
                );

        return http.build();
    }

}
