package com.BlockHeads.services;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.BlockHeads.models.User;
import com.BlockHeads.repositories.UserRepository;

public class CustomUserDetailsService { //mplements UserDetailsService{
	
	private UserRepository userRepository;
	
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    	User user = userRepository.findByUsername(username)
//                .orElseThrow(() ->
//                        new UsernameNotFoundException("User not found with username: " + username));
//
//
//    	return new org.springframework.security.core.userdetails.User(
//    			user.getEmail(),
//    			user.getPassword(),
//    			
//    	);
//    }
}
