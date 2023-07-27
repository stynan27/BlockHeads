package com.BlockHeads.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.BlockHeads.controller.UserAccountController;
import com.BlockHeads.model.UserAccount;
import com.BlockHeads.repository.UserAccountRepository;
import com.BlockHeads.service.UserAccountService;

@Service
public class UserAccountServiceImpl implements UserAccountService { 
	
	private static final Logger LOG = LoggerFactory.getLogger(UserAccountController.class);
	
	private UserAccountRepository userAccountRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
    @Autowired
    private PasswordEncoder passwordEncoder;
	
    public UserAccountServiceImpl(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

	@Override
	public UserAccount createAccount(UserAccount user) {
		LOG.info("UserAccountService createAccount() for user: [{}])", user.getUsername());

        // create user object
        UserAccount userAccount = new UserAccount();
        //user.setName(registerDto.getName());
        userAccount.setUsername(user.getUsername());
        //user.setEmail(registerDto.getEmail());
        
        // passwordEncoder.encode() uses BCrypt to hash + salt our passwords
        // this makes stored passwords more difficult to crack
        userAccount.setPassword(passwordEncoder.encode(user.getPassword()));

        userAccountRepository.save(userAccount);
		
		return userAccount;
	}

	@Override
	public UserAccount readAccountByUsername(String username) {
		return userAccountRepository.findByUsername(username).get();
	}
	
	@Override
	public Boolean accountExists(String username) {
		return userAccountRepository.existsByUsername(username);
	}

	@Override
	public String authenticateAccount(UserAccount user) {
    	Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
    	LOG.info("Authentication obj [{}]", authentication);
    	try {
    		// Previously this line would break as the Auth requests
    		// should be delegated to an AuthenticationProvider.
    		// However, none were configured in the SecurityConfig.
    		authentication = authenticationManager.authenticate(authentication);
    	} catch (BadCredentialsException bc) {
    		String errorMessageString = "Bad Credentials Exception: " + bc.getMessage();
    		LOG.info(errorMessageString);
    		return errorMessageString;
    	}
    	LOG.info("Authentication obj [{}]", authentication);
    	
    	// Update record of who is currently authenticated by the application/API in the Singleton SecurityContextHolder
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	
    	return "";
	}
	
    
}
