package com.BlockHeads.config;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication; // correct dependency?
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.BlockHeads.model.UserAccount;
import com.BlockHeads.repository.UserAccountRepository;

public class CustomAuthenticationProvider implements AuthenticationProvider {
 	
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        // Empty list of authorities/roles (Not applicable)
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        // Query the database for the user with the given username and password.
        // If the user is found, create a new Authentication object with the given username, password and authorities.
        // If the user is not found, throw an AuthenticationException.
        try {
        	UserAccount userAccount = userAccountRepository.findByUsername(username).get();
        	
        	if (passwordEncoder.matches(password, userAccount.getPassword())) {
                return new UsernamePasswordAuthenticationToken(username, password, grantedAuthorities);
        	} else {
        		throw new BadCredentialsException("Invalid password");
        	}
        } catch(NoSuchElementException e) {
        	throw new BadCredentialsException("Invalid username");
        }
        

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
